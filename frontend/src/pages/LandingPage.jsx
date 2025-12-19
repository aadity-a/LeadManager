import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { ArrowRight, Mail, Phone, MapPin, Send } from 'lucide-react';

const LandingPage = () => {
    const [projects, setProjects] = useState([]);
    const [clients, setClients] = useState([]);
    const [contactForm, setContactForm] = useState({ fullName: '', email: '', mobile: '', city: '' });
    const [newsletterEmail, setNewsletterEmail] = useState('');

    useEffect(() => {
        api.fetchProjects().then(setProjects);
        api.fetchClients().then(setClients);
    }, []);

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        await api.submitContact(contactForm);
        alert('Contact submitted successfully!');
        setContactForm({ fullName: '', email: '', mobile: '', city: '' });
    };

    const handleSubscribe = async (e) => {
        e.preventDefault();
        await api.subscribe(newsletterEmail);
        alert('Subscribed successfully!');
        setNewsletterEmail('');
    };

    return (
        <div>
            {/* Hero Section */}
            <section style={{
                padding: '6rem 0',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                textAlign: 'center'
            }}>
                <div className="container">
                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1.5rem', color: '#1F2937' }}>Build Your Dreams With Us</h1>
                    <p style={{ fontSize: '1.25rem', color: '#4B5563', maxWidth: '700px', margin: '0 auto 2rem' }}>
                        We deliver innovative solutions that help your business grow. Explore our projects and see what our happy clients have to say.
                    </p>
                    <a href="#projects" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Get Started</a>
                </div>
            </section>

            {/* Our Projects */}
            <section id="projects" style={{ padding: '5rem 0' }}>
                <div className="container">
                    <h2 className="section-title">Our Projects</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {projects.map(project => (
                            <div key={project.id} className="card">
                                <img src={project.image} alt={project.name} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                                <div style={{ padding: '1.5rem' }}>
                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.name}</h3>
                                    <p style={{ color: '#6B7280', marginBottom: '1.5rem' }}>{project.description}</p>
                                    <button className="btn" style={{ border: '1px solid #E5E7EB', width: '100%' }}>Read More</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Happy Clients */}
            <section style={{ padding: '5rem 0', backgroundColor: '#F3F4F6' }}>
                <div className="container">
                    <h2 className="section-title">Happy Clients</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        {clients.map(client => (
                            <div key={client.id} className="card" style={{ padding: '2rem', textAlign: 'center' }}>
                                <img src={client.image} alt={client.name} style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 1rem' }} />
                                <p style={{ fontStyle: 'italic', marginBottom: '1rem', color: '#4B5563' }}>"{client.description}"</p>
                                <h4 style={{ fontWeight: 'bold' }}>{client.name}</h4>
                                <span style={{ color: 'var(--primary-color)', fontSize: '0.9rem' }}>{client.designation}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form */}
            <section style={{ padding: '5rem 0' }}>
                <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Get In Touch</h2>
                        <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Have a project in mind? Send us a message and we'll reply as soon as possible.</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#EEF2FF', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}><Phone size={24} /></div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>Phone</div>
                                    <div style={{ color: '#6B7280' }}>+91 987654321</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#EEF2FF', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}><Mail size={24} /></div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>Email</div>
                                    <div style={{ color: '#6B7280' }}>contact@projectmanager.com</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <div style={{ background: '#EEF2FF', padding: '1rem', borderRadius: '50%', color: 'var(--primary-color)' }}><MapPin size={24} /></div>
                                <div>
                                    <div style={{ fontWeight: 'bold' }}>Location</div>
                                    <div style={{ color: '#6B7280' }}>123 Building, X Tower, Indore(M.P)</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '2rem' }}>
                        <form onSubmit={handleContactSubmit}>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Full Name</label>
                                <input type="text" placeholder="Enter your full name" value={contactForm.fullName} onChange={e => setContactForm({ ...contactForm, fullName: e.target.value })} required />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Email Address</label>
                                <input type="email" placeholder="Enter your email" value={contactForm.email} onChange={e => setContactForm({ ...contactForm, email: e.target.value })} required />
                            </div>
                            <div style={{ marginBottom: '1rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Mobile Number</label>
                                <input type="tel" placeholder="Enter your mobile number" value={contactForm.mobile} onChange={e => setContactForm({ ...contactForm, mobile: e.target.value })} required />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>City</label>
                                <input type="text" placeholder="Enter your city" value={contactForm.city} onChange={e => setContactForm({ ...contactForm, city: e.target.value })} required />
                            </div>
                            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                                <Send size={18} style={{ marginRight: '8px' }} />
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section style={{ padding: '4rem 0', background: 'var(--primary-color)', color: 'white' }}>
                <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Subscribe to our Newsletter</h2>
                    <p style={{ marginBottom: '2rem', opacity: '0.9' }}>Stay updated with our latest news and projects.</p>
                    <form onSubmit={handleSubscribe} style={{ display: 'flex', gap: '1rem' }}>
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            value={newsletterEmail}
                            onChange={e => setNewsletterEmail(e.target.value)}
                            required
                            style={{ flex: 1, marginBottom: 0, border: 'none' }}
                        />
                        <button type="submit" className="btn" style={{ background: 'white', color: 'var(--primary-color)', fontWeight: 'bold' }}>Subscribe</button>
                    </form>
                </div>
            </section>

            {/* Footer */}
            <footer style={{ background: '#1F2937', color: '#9CA3AF', padding: '2rem 0', textAlign: 'center' }}>
                <div className="container">
                    <p>&copy; 2024 ProjectManager. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
