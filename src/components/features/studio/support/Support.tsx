import React, { useState } from 'react';
import { AuthState } from '@/types';
import Button from '@/components/common/Button';
import { MdEmail, MdSend } from 'react-icons/md';
import { FaInstagram } from 'react-icons/fa';
import { useSupport } from '@/store/hooks/useSupport';

export function Support({ user }: AuthState) {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    message: '',
    subject: ''
  });
  
  const { isSubmitting, status, submitSupport } = useSupport();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await submitSupport({
      ...formData,
      userId: user?.uid // Add user ID if available
    });

    if (success) {
      // Reset form
      setFormData(prev => ({ ...prev, message: '', subject: '' }));
    }
  };

  return (
    <main className="max-w-4xl mx-auto py-4 md:py-12 px-4 md:px-0">
      <div className="text-center mb-8">
        <h1 className="text-2xl md:text-3xl font-medium mb-2">Support Center</h1>
        <p className="text-base text-muted-text">We're here to help you succeed</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Contact Form */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-medium mb-4">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-text mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-text mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-text mb-1">
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-text mb-1">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[120px]"
                required
              />
            </div>

            {status.message && (
              <div className={`text-sm ${status.type === 'success' ? 'text-accent' : 'text-primary'}`}>
                {status.message}
              </div>
            )}

            <Button
              type="submit"
              isLoading={isSubmitting}
              icon={MdSend}
              className="w-full"
            >
              Send Message
            </Button>
          </form>
        </div>

        {/* Support Channels */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-medium mb-4">Quick Support</h2>
            <div className="space-y-4">
              <a
                href="mailto:support@easytovideo.com"
                className="flex items-center p-4 border border-muted rounded-md hover:bg-background transition-colors"
              >
                <MdEmail className="w-6 h-6 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">Email Support</h3>
                  <p className="text-sm text-muted-text">support@easytovideo.com</p>
                </div>
              </a>

              <a
                href="https://instagram.com/easytovideo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center p-4 border border-muted rounded-md hover:bg-background transition-colors"
              >
                <FaInstagram className="w-6 h-6 text-primary mr-3" />
                <div>
                  <h3 className="font-medium">Instagram</h3>
                  <p className="text-sm text-muted-text">@easytovideo</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
