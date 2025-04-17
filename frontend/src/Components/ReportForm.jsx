// src/components/ReportForm.js
import React, { useState, useRef } from 'react';
import './ReportForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const ReportForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    description: '',
    district: '',
    sector: '',
    cell: '',
    dateTime: '',
    media: null,
    audio: null,
    contact: '' // Optional
  });

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleStartRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setFormData(prev => ({ ...prev, audio: audioBlob }));
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const handleStopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.description.trim() && !formData.audio) {
      alert(t("report_alert"));
      return;
    }

    console.log('Form Data:', formData);
    // Send the formData to your server here.
  };

  return (
    <form onSubmit={handleSubmit} className="report-form">
      <h2>
        {t("report_title")}{" "}
        <FontAwesomeIcon icon={faHandshake} style={{ color: '#ffffffd6' }} size="lg" />
      </h2>

      <label>{t("district")}</label>
      <input name="district" value={formData.district} onChange={handleChange} required />

      <label>{t("sector")}</label>
      <input name="sector" value={formData.sector} onChange={handleChange} required />

      <label>{t("cell")}</label>
      <input name="cell" value={formData.cell} onChange={handleChange} required />

      <label>{t("date")}</label>
      <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />

      <label>{t("media")}</label>
      <input type="file" name="media" onChange={handleChange} />

      <label>{t("description")}</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder={t("description_placeholder")}
      />

      <div className="audio-controls">
        <label>{t("record_audio")}</label>
        {recording ? (
          <button type="button" className="whatsapp-button stop" onClick={handleStopRecording}>
            Stop
          </button>
        ) : (
          <button type="button" className="whatsapp-button record" onClick={handleStartRecording}>
            <FontAwesomeIcon icon={faMicrophone} />
          </button>
        )}
      </div>


      {formData.audio && (
        <div>
          <p>{t("audio_taken")}</p>
          <audio controls>
            <source src={URL.createObjectURL(formData.audio)} type="audio/webm" />
          </audio>
        </div>
      )}

      {/* Optional Identity */}
      <label style={{ marginTop: '20px' }}>
        {t("contact_optional")}
      </label>
      <input
        type="text"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        placeholder={t("contact_placeholder")}
      />

      <button type="submit">{t("submit")}</button>
    </form>
  );
};

export default ReportForm;
