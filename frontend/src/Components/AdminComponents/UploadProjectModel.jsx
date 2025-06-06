import React from 'react';
import './UploadProject.css'

const UploadProjectModal = ({ formData, onChange, onFileChange, onClose, onSubmit, isUploading }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Upload New Project</h2>
        <form onSubmit={onSubmit}>
          <select
            value={formData.service}
            onChange={(e) => onChange({ ...formData, service: e.target.value })}
            className="form-select"
          >
            <option value="road">Road Construction</option>
            <option value="building">Building Construction</option>
            <option value="bridge">Bridge Construction</option>
          </select>

          <input
            type="text"
            placeholder="Project Name"
            value={formData.projectName}
            onChange={(e) => onChange({ ...formData, projectName: e.target.value })}
            className="form-input"
            required
          />

          <textarea
            placeholder="Project Description"
            value={formData.description}
            onChange={(e) => onChange({ ...formData, description: e.target.value })}
            className="form-textarea"
            required
          />

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onFileChange}
            className="file-input"
            required
          />

          <button type="submit" className="btn btn-success" disabled={isUploading}> {isUploading ? <span className='spinner'></span> : "Upload Project"}</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UploadProjectModal;
