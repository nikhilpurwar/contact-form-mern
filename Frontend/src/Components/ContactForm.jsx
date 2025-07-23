import React, { useState, useEffect } from 'react';
import './ContactForm.css';

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    files: []
  });

  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-]{7,15}$/.test(form.phone.trim())) {
      newErrors.phone = 'Phone number is invalid';
    }
    if (!form.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = 'Email is invalid';
    }
    if (!form.subject.trim()) newErrors.subject = 'Subject is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    if (form.files.length > 5) {
      newErrors.files = 'You can upload a maximum of 5 files only';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setForm({ ...form, files: e.target.files });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
    setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      setToast({
        show: true,
        message: 'Please fix the errors in the form',
        type: 'error'
      });
      return;
    }

    const data = new FormData();
    data.append('name', form.name);
    data.append('phone', form.phone);
    data.append('email', form.email);
    data.append('subject', form.subject);
    data.append('message', form.message);
    Array.from(form.files).forEach(file => data.append('files', file));

    try {
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        setToast({
          show: true,
          message: 'Message sent successfully!',
          type: 'success'
        });
        setForm({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
          files: []
        });
        setErrors({});
        document.getElementById('contact-form').reset();
      } else {
        setToast({
          show: true,
          message: 'Error submitting form',
          type: 'error'
        });
      }
    } catch (error) {
      setToast({
        show: true,
        message: 'Network error. Please try again.',
        type: 'error'
      });
    }
  };

  return (
    <>
      <form id="contact-form" onSubmit={handleSubmit} encType="multipart/form-data" noValidate>
        <div className="form-group">
          <input
            name="name"
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className={errors.name ? 'error' : ''}
            required
          />
          {errors.name && <span className="error-msg">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            required
          />
          {errors.phone && <span className="error-msg">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            required
          />
          {errors.email && <span className="error-msg">{errors.email}</span>}
        </div>

        <div className="form-group">
          <input
            name="subject"
            type="text"
            placeholder="Subject"
            value={form.subject}
            onChange={handleChange}
            className={errors.subject ? 'error' : ''}
            required
          />
          {errors.subject && <span className="error-msg">{errors.subject}</span>}
        </div>

        <div className="form-group">
          <textarea
            name="message"
            placeholder="Message"
            value={form.message}
            onChange={handleChange}
            className={errors.message ? 'error' : ''}
            required
          />
          {errors.message && <span className="error-msg">{errors.message}</span>}
        </div>

        <div className="form-group">
          <input
            name="files"
            type="file"
            multiple
            onChange={handleChange}
            className={errors.files ? 'error' : ''}
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
          />
          {errors.files && <span className="error-msg">{errors.files}</span>}
        </div>

        <button type="submit" className="btn-neopop">Submit</button>
      </form>

      {toast.show && (
        <div className={`toast-alert ${toast.type}`}>
          {toast.type === 'success' ? '✓' : '✗'} {toast.message}
        </div>
      )}
    </>
  );
};