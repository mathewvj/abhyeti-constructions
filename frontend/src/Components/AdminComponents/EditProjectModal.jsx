import './EditProject.css'

const EditProjectModal = ({
  editedData,
  imagesToKeep,
  onChange,
  onImageDelete,
  onImageChange,
  onClose,
  onUpdate,
  isUploading
}) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Edit Project</h2>
        <form onSubmit={onUpdate}>
          <select
            value={editedData.service}
            onChange={(e) => onChange({ ...editedData, service: e.target.value })}
            className="form-select"
          >
            <option value="road">Road Construction</option>
            <option value="building">Building Construction</option>
            <option value="bridge">Bridge Construction</option>
          </select>

          <input
            type="text"
            value={editedData.projectName}
            onChange={(e) => onChange({ ...editedData, projectName: e.target.value })}
            className="form-input"
            placeholder="Project Name"
            required
          />

          <textarea
            value={editedData.description}
            onChange={(e) => onChange({ ...editedData, description: e.target.value })}
            className="form-textarea"
            placeholder="Project Description"
            required
          />

          <div className="project-images-grid">
            {imagesToKeep.map((img, idx) => (
              <div key={idx} style={{ position: 'relative' }}>
                <img
                  src={img}
                  alt="preview"
                  className="project-image"
                />
                <button
                  type="button"
                  className="btn btn-sm btn-danger"
                  onClick={() => onImageDelete(img)}
                  style={{ position: 'absolute', top: 0, right: 0 }}
                >
                  X
                </button>
              </div>
            ))}
          </div>

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
            className="file-input"
          />

          <button type="submit" className="btn btn-primary" disabled={isUploading}>{isUploading ? <span className='spinner'></span> : "Update Project"}</button>
          <button type="button" className="btn btn-secondary" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default EditProjectModal;
