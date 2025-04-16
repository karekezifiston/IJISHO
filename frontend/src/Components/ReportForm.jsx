import React, { useState, useRef } from 'react';
import './ReportForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone, faStop } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';



const ReportForm = () => {
  const [formData, setFormData] = useState({
    description: '',
    district: '',
    sector: '',
    cell: '',
    dateTime: '',
    media: null,
    audio: null,
    anonymous: true,
    contact: ''
  });

  const [recording, setRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : (type === 'checkbox' ? checked : value)
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

    // Ensure at least description or audio is filled
    if (!formData.description.trim() && !formData.audio) {
      alert("Please either write a report or record a voice note.");
      return;
    }

    console.log('Form Data:', formData);

    // You can send data here (including audio)
  };

  return (
    <form onSubmit={handleSubmit} className="report-form">
      <h2>
        Tanga amakuru ku cyaha{" "}
        <FontAwesomeIcon
          icon={faHandshake}
          style={{ color: '#ffffffd6' }}
          size="lg" // or "2x", "3x", "4x" for bigger
        />
      </h2>


      <label>District:</label>
      <input name="district" value={formData.district} onChange={handleChange} required />

      <label>Sector:</label>
      <input name="sector" value={formData.sector} onChange={handleChange} required />

      <label>Cell:</label>
      <input name="cell" value={formData.cell} onChange={handleChange} required />

      <label>Byabaye ryari?</label>
      <input type="datetime-local" name="dateTime" value={formData.dateTime} onChange={handleChange} required />

      <label>Waba ufite amashusho cg amafoto waduha ?</label>
      <input type="file" name="media" onChange={handleChange} />

      <label>Sobanura uko byagenze cg wifate amajwi udusobanurira hasi:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Tangira wandike usobanura niba utari bufate amajwi..." />




      <label>Fata Amajwi usobanure:</label>
      {recording ? (
        <button type="button" onClick={handleStopRecording}>
          Stop <FontAwesomeIcon icon={faStop} style={{ color: 'red' }} />
        </button>
      ) : (
        <button type="button" onClick={handleStartRecording}>
          Tangira <FontAwesomeIcon icon={faMicrophone} style={{ color: 'red' }} />
        </button>
      )}

      {formData.audio && (
        <div>
          <p>Amajwi wafashe:</p>
          <audio controls>
            <source src={URL.createObjectURL(formData.audio)} type="audio/webm" />
          </audio>
        </div>
      )}


      <label>
        <input type="checkbox" name="anonymous" checked={formData.anonymous} onChange={handleChange} />
        Submit Anonymously
      </label>

      {!formData.anonymous && (
        <>
          <label>Contact Info:</label>
          <input name="contact" value={formData.contact} onChange={handleChange} />
        </>
      )}

      <button type="submit">Ohereza</button>
    </form>
  );
};

export default ReportForm;
