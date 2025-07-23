import React, { useState } from 'react';

export const ContactForm = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
    files: []
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setForm({ ...form, files: e.target.files });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setStatus('Message sent!');
        setForm({
          name: '',
          phone: '',
          email: '',
          subject: '',
          message: '',
          files: []
        });
        document.getElementById('contact-form').reset();
      } else {
        setStatus('Error submitting form');
      }
    } catch {
      setStatus('Error submitting form');
    }
  };

  return (
    <form id="contact-form" onSubmit={handleSubmit} encType="multipart/form-data">
      <input name="name" type="text" placeholder="Name" onChange={handleChange} required />
      <input name="phone" type="tel" placeholder="Phone Number" onChange={handleChange} required />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
      <input name="subject" type="text" placeholder="Subject" onChange={handleChange} required />
      <textarea name="message" placeholder="Message" onChange={handleChange} required />
      <input name="files" type="file" multiple onChange={handleChange} />
      <button type="submit">Submit</button>
      <div>{status}</div>
    </form>
  );
};

