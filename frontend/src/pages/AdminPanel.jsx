import React, { useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';
import { LayoutGrid, Users, MessageSquare, Mail, Plus, Save, Upload, X, Check } from 'lucide-react';
import Cropper from 'react-easy-crop';
import { getCroppedImg } from '../utils/cropImage';

const AdminPanel = () => {
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [contacts, setContacts] = useState([]);
    const [subscribers, setSubscribers] = useState([]);

    // Forms
    const [projectForm, setProjectForm] = useState({ name: '', description: '', image: '' });
    const [clientForm, setClientForm] = useState({ name: '', description: '', designation: '', image: '' });

    // Cropping State
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppingImage, setCroppingImage] = useState(null);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [isCropping, setIsCropping] = useState(false);
    const [croppingTarget, setCroppingTarget] = useState(null); // 'project' or 'client'

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        api.fetchProjects().then(setProjects);
        api.fetchClients().then(setClients);
        api.fetchContacts().then(setContacts);
        api.fetchSubscribers().then(setSubscribers);
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        await api.addProject(projectForm);
        alert('Project added successfully');
        setProjectForm({ name: '', description: '', image: '' });
        loadData();
    };

    const handleAddClient = async (e) => {
        e.preventDefault();
        await api.addClient(clientForm);
        alert('Client added successfully');
        setClientForm({ name: '', description: '', designation: '', image: '' });
        loadData();
    };

    // Image Handling
    const onFileChange = async (e, target) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const imageDataUrl = await readFile(file);
            setCroppingImage(imageDataUrl);
            setCroppingTarget(target);
            setIsCropping(true);
            setZoom(1);
        }
    };

    const readFile = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.addEventListener('load', () => resolve(reader.result), false);
            reader.readAsDataURL(file);
        });
    };

    const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = async () => {
        try {
            const croppedImageBase64 = await getCroppedImg(croppingImage, croppedAreaPixels);

            if (croppingTarget === 'project') {
                setProjectForm({ ...projectForm, image: croppedImageBase64 });
            } else if (croppingTarget === 'client') {
                setClientForm({ ...clientForm, image: croppedImageBase64 });
            }

            handleCloseCropper();
        } catch (e) {
            console.error(e);
        }
    };

    const handleCloseCropper = () => {
        setIsCropping(false);
        setCroppingImage(null);
        setCroppingTarget(null);
    };

    const SidebarItem = ({ id, icon: Icon, label }) => (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem',
                background: activeTab === id ? 'var(--primary-color)' : 'transparent',
                color: activeTab === id ? 'white' : '#6B7280',
                borderRadius: '0.5rem',
                marginBottom: '0.5rem',
                textAlign: 'left',
                fontWeight: 500
            }}
        >
            <Icon size={20} style={{ marginRight: '10px' }} />
            {label}
        </button>
    );

    return (
        <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)', background: '#F3F4F6' }}>
            {/* Sidebar */}
            <aside style={{ width: '280px', background: 'white', padding: '2rem', borderRight: '1px solid #E5E7EB' }}>
                <h2 style={{ marginBottom: '2rem', paddingLeft: '1rem' }}>Admin Dashboard</h2>
                <SidebarItem id="projects" icon={LayoutGrid} label="Projects" />
                <SidebarItem id="clients" icon={Users} label="Clients" />
                <SidebarItem id="contacts" icon={MessageSquare} label="Contact Responses" />
                <SidebarItem id="subscribers" icon={Mail} label="Subscribers" />
            </aside>

            {/* Main Content */}
            <main style={{ flex: 1, padding: '3rem', position: 'relative' }}>
                <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>

                    {activeTab === 'projects' && (
                        <div>
                            <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>Manage Projects</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                                <div>
                                    <h3 style={{ marginBottom: '1.5rem' }}>Add New Project</h3>
                                    <form onSubmit={handleAddProject}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Project Name</label>
                                            <input value={projectForm.name} onChange={e => setProjectForm({ ...projectForm, name: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Project Image</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => onFileChange(e, 'project')}
                                                    style={{ display: 'none' }}
                                                    id="project-image-upload"
                                                />
                                                <label htmlFor="project-image-upload" className="btn btn-secondary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                    <Upload size={16} style={{ marginRight: '8px' }} />
                                                    Upload Image
                                                </label>
                                                {projectForm.image && <span style={{ color: 'green', fontSize: '0.9rem' }}>Image Selected</span>}
                                            </div>
                                            {projectForm.image && (
                                                <img src={projectForm.image} alt="Preview" style={{ marginTop: '1rem', width: '100%', height: '150px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                            )}
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                                            <textarea rows="4" value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            <Plus size={18} style={{ marginRight: '8px' }} />
                                            Add Project
                                        </button>
                                    </form>
                                </div>

                                <div>
                                    <h3 style={{ marginBottom: '1.5rem' }}>Existing Projects</h3>
                                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                        {projects.map(p => (
                                            <div key={p.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '0.5rem' }}>
                                                <img src={p.image} alt={p.name} style={{ width: '80px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                                <div>
                                                    <h4 style={{ fontWeight: 'bold' }}>{p.name}</h4>
                                                    <p style={{ fontSize: '0.9rem', color: '#6B7280' }} >{p.description.substring(0, 50)}...</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'clients' && (
                        <div>
                            <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>Manage Clients</h2>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                                <div>
                                    <h3 style={{ marginBottom: '1.5rem' }}>Add New Client</h3>
                                    <form onSubmit={handleAddClient}>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Client Name</label>
                                            <input value={clientForm.name} onChange={e => setClientForm({ ...clientForm, name: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Designation</label>
                                            <input value={clientForm.designation} onChange={e => setClientForm({ ...clientForm, designation: e.target.value })} required />
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Client Image</label>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => onFileChange(e, 'client')}
                                                    style={{ display: 'none' }}
                                                    id="client-image-upload"
                                                />
                                                <label htmlFor="client-image-upload" className="btn btn-secondary" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                                                    <Upload size={16} style={{ marginRight: '8px' }} />
                                                    Upload Image
                                                </label>
                                                {clientForm.image && <span style={{ color: 'green', fontSize: '0.9rem' }}>Image Selected</span>}
                                            </div>
                                            {clientForm.image && (
                                                <img src={clientForm.image} alt="Preview" style={{ marginTop: '1rem', width: '100%', height: '150px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                            )}
                                        </div>
                                        <div>
                                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                                            <textarea rows="4" value={clientForm.description} onChange={e => setClientForm({ ...clientForm, description: e.target.value })} required />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            <Plus size={18} style={{ marginRight: '8px' }} />
                                            Add Client
                                        </button>
                                    </form>
                                </div>

                                <div>
                                    <h3 style={{ marginBottom: '1.5rem' }}>Existing Clients</h3>
                                    <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                        {clients.map(c => (
                                            <div key={c.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', padding: '1rem', border: '1px solid #E5E7EB', borderRadius: '0.5rem' }}>
                                                <img src={c.image} alt={c.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '50%' }} />
                                                <div>
                                                    <h4 style={{ fontWeight: 'bold' }}>{c.name}</h4>
                                                    <p style={{ fontSize: '0.9rem', color: 'var(--primary-color)' }}>{c.designation}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'contacts' && (
                        <div>
                            <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>Contact Responses</h2>
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr style={{ background: '#F9FAFB', textAlign: 'left' }}>
                                            <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>Full Name</th>
                                            <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>Email</th>
                                            <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>Mobile</th>
                                            <th style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB' }}>City</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.length === 0 ? (
                                            <tr><td colSpan="4" style={{ padding: '1rem', textAlign: 'center', color: '#6B7280' }}>No contacts yet.</td></tr>
                                        ) : (
                                            contacts.map((c, i) => (
                                                <tr key={i} style={{ borderBottom: '1px solid #E5E7EB' }}>
                                                    <td style={{ padding: '1rem' }}>{c.fullName}</td>
                                                    <td style={{ padding: '1rem' }}>{c.email}</td>
                                                    <td style={{ padding: '1rem' }}>{c.mobile}</td>
                                                    <td style={{ padding: '1rem' }}>{c.city}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeTab === 'subscribers' && (
                        <div>
                            <h2 style={{ marginBottom: '2rem', borderBottom: '1px solid #E5E7EB', paddingBottom: '1rem' }}>Subscribed Emails</h2>
                            <ul style={{ border: '1px solid #E5E7EB', borderRadius: '0.5rem', divideY: '1px solid #E5E7EB' }}>
                                {subscribers.length === 0 ? (
                                    <li style={{ padding: '1rem', color: '#6B7280', textAlign: 'center' }}>No subscribers yet.</li>
                                ) : (
                                    subscribers.map((s, i) => (
                                        <li key={i} style={{ padding: '1rem', borderBottom: '1px solid #E5E7EB', display: 'flex', alignItems: 'center' }}>
                                            <Mail size={16} style={{ marginRight: '10px', color: '#6B7280' }} />
                                            {s.email || s}
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    )}

                </div>
            </main>

            {/* Cropper Modal */}
            {isCropping && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(0,0,0,0.8)',
                    zIndex: 1000,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div style={{ position: 'relative', flex: 1, margin: '2rem' }}>
                        <Cropper
                            image={croppingImage}
                            crop={crop}
                            zoom={zoom}
                            aspect={450 / 350}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    </div>
                    <div style={{
                        background: 'white',
                        padding: '1.5rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <span style={{ fontWeight: 'bold' }}>Crop Image</span>
                            <span style={{ fontSize: '0.9rem', color: '#6B7280' }}>Adjust selection to fit 450x350 ratio</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button onClick={handleCloseCropper} className="btn" style={{ background: '#EF4444', color: 'white', border: 'none' }}>
                                <X size={20} style={{ marginRight: '5px' }} /> Cancel
                            </button>
                            <button onClick={showCroppedImage} className="btn btn-primary">
                                <Check size={20} style={{ marginRight: '5px' }} /> Set Image
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
