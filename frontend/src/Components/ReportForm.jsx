import React, { useState, useRef } from 'react';
import './ReportForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop, faHandshake } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from 'react-i18next';

const locationData = {
  Kigali: {
    Gasabo: ["Remera", "Kimironko", "Kacyiru"],
    Kicukiro: ["Gikondo", "Nyarugunga", "Kanombe"],
    Nyarugenge: ["Nyamirambo", "Kigali", "Rwezamenyo"]
  },
  Northern: {
    Musanze: ["Muhoza", "Cyuve", "Kinigi"],
    Gakenke: ["Gakenke", "Mataba", "Rushashi"]
  },
  Southern: {
    Huye: ["Ngoma", "Tumba", "Kigoma"],
    Nyanza: ["Busasamana", "Kibirizi", "Mukingo"]
  },
  Western: {
    Rubavu: ["Gisenyi", "Nyundo", "Kanama"],
    Rusizi: ["Kamembe", "Mururu", "Gihundwe"]
  },
  Eastern: {
    Rwamagana: ["Kigabiro", "Nzige", "Karenge"],
    Nyagatare: ["Rukomo", "Gatunda", "Karama"]
  }
};

const ReportForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    province: '',
    district: '',
    sector: '',
    crimeType: '',
    dateTime: '',
    description: '',
    media: null,
    audio: null,
    contact: ''
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

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setFormData(prev => ({
      ...prev,
      province,
      district: '',
      sector: ''
    }));
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setFormData(prev => ({
      ...prev,
      district,
      sector: ''
    }));
  };

  const handleSectorChange = (e) => {
    const sector = e.target.value;
    setFormData(prev => ({
      ...prev,
      sector
    }));
  };

  const handleStartRecording = async () => {
    try {
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
    } catch (error) {
      alert(t("audio_permission_error"));
      console.error("Audio recording error:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.description.trim() && !formData.audio) {
      alert(t("report_alert"));
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append('province', formData.province);
    formDataToSend.append('district', formData.district);
    formDataToSend.append('sector', formData.sector);
    formDataToSend.append('crimeType', formData.crimeType);
    formDataToSend.append('dateTime', formData.dateTime);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('contact', formData.contact);

    if (formData.media) {
      formDataToSend.append('media', formData.media);
    }

    if (formData.audio) {
      formDataToSend.append('audio', formData.audio);
    }

    try {
      const response = await fetch('http://localhost:5000/api/report', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        alert(t("report_success"));
        setFormData({
          province: '',
          district: '',
          sector: '',
          crimeType: '',
          dateTime: '',
          description: '',
          media: null,
          audio: null,
          contact: ''
        });
      } else {
        alert(t("report_error"));
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      alert(t("report_error"));
    }
  };

  const availableDistricts = formData.province ? Object.keys(locationData[formData.province]) : [];
  const availableSectors = formData.district ? locationData[formData.province][formData.district] : [];

  return (
    <form onSubmit={handleSubmit} className="report-form">
      <h2>
        {t("report_title")}{" "}
        <FontAwesomeIcon icon={faHandshake} style={{ color: '#ffffffd6' }} size="lg" />
      </h2>

      <div className='all-drop-down'>
        <label>{t("province")}</label>
        <select name="province" value={formData.province} onChange={handleProvinceChange} required>
          <option value="">{t("select_province")}</option>
          {Object.keys(locationData).map(province => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>

        <label>{t("district")}</label>
        <select name="district" value={formData.district} onChange={handleDistrictChange} required disabled={!formData.province}>
          <option value="">{t("select_district")}</option>
          {availableDistricts.map(district => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>

        <label>{t("sector")}</label>
        <select name="sector" value={formData.sector} onChange={handleSectorChange} required disabled={!formData.district}>
          <option value="">{t("select_sector")}</option>
          {availableSectors.map(sector => (
            <option key={sector} value={sector}>{sector}</option>
          ))}
        </select>
      </div>

      <div className='crimeType'>
        <label>{t("crime_type")}</label>
        <input
          type="text"
          name="crimeType"
          value={formData.crimeType}
          onChange={handleChange}
          placeholder={t("crime_type_placeholder")}
          required
        />
      </div>

      <label>{t("date")}</label>
      <input
        type="datetime-local"
        name="dateTime"
        value={formData.dateTime}
        onChange={handleChange}
        required
      />

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
            <FontAwesomeIcon icon={faStop} />
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

      <label style={{ marginTop: '20px' }}>{t("contact_optional")}</label>
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
