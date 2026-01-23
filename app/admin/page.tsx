'use client';
import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, Edit, RefreshCw } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [footerSettings, setFooterSettings] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [servicesRes, caseStudiesRes, testimonialsRes, footerRes] = await Promise.all([
        supabase.from('services').select('*'),
        supabase.from('case_studies').select('*'),
        supabase.from('testimonials').select('*'),
        supabase.from('footer_settings').select('*').eq('id', 'default').single()
      ]);

      if (servicesRes.data) setServices(servicesRes.data);
      if (caseStudiesRes.data) setCaseStudies(caseStudiesRes.data);
      if (testimonialsRes.data) setTestimonials(testimonialsRes.data);
      if (footerRes.data) setFooterSettings(footerRes.data);
    } catch (error) {
      console.error('Error loading data:', error);
      alert('Error loading data from database');
    }
    setLoading(false);
  };

  const updateFooterSettings = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('footer_settings')
      .update(footerSettings)
      .eq('id', 'default');

    if (error) {
      alert('Error updating footer: ' + error.message);
    } else {
      alert('✅ Footer settings updated successfully!');
    }
    setSaving(false);
  };

  const updateService = async (id, updates) => {
    setSaving(true);
    const { error } = await supabase
      .from('services')
      .update(updates)
      .eq('id', id);

    if (error) {
      alert('Error updating service: ' + error.message);
    } else {
      alert('✅ Service updated successfully!');
      loadData();
    }
    setSaving(false);
    setEditingItem(null);
  };

  const updateTestimonial = async (id, updates) => {
    setSaving(true);
    const { error } = await supabase
      .from('testimonials')
      .update(updates)
      .eq('id', id);

    if (error) {
      alert('Error updating testimonial: ' + error.message);
    } else {
      alert('✅ Testimonial updated successfully!');
      loadData();
    }
    setSaving(false);
    setEditingItem(null);
  };

  const deleteService = async (id) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    
    const { error } = await supabase.from('services').delete().eq('id', id);
    if (error) {
      alert('Error deleting service: ' + error.message);
    } else {
      alert('✅ Service deleted successfully!');
      loadData();
    }
  };

  const deleteTestimonial = async (id) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) {
      alert('Error deleting testimonial: ' + error.message);
    } else {
      alert('✅ Testimonial deleted successfully!');
      loadData();
    }
  };

  const deleteCaseStudy = async (id) => {
    if (!confirm('Are you sure you want to delete this case study?')) return;
    
    const { error } = await supabase.from('case_studies').delete().eq('id', id);
    if (error) {
      alert('Error deleting case study: ' + error.message);
    } else {
      alert('✅ Case study deleted successfully!');
      loadData();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
          <p className="text-gray-600">Loading data from database...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Fentech Admin Dashboard</h1>
            <button 
              onClick={loadData} 
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              <RefreshCw size={20} /> Refresh Data
            </button>
          </div>

          <div className="flex gap-4 mb-8 border-b overflow-x-auto">
            {[
              { key: 'services', label: 'Services' },
              { key: 'case-studies', label: 'Case Studies' },
              { key: 'testimonials', label: 'Testimonials' },
              { key: 'footer', label: 'Footer Settings' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 font-semibold whitespace-nowrap ${
                  activeTab === tab.key ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="mt-8">
            {activeTab === 'services' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Services ({services.length})</h2>
                {services.map((service) => (
                  <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                    {editingItem?.id === service.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Service Name"
                        />
                        <input
                          type="text"
                          value={editingItem.title}
                          onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Title"
                        />
                        <textarea
                          value={editingItem.description}
                          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          rows="4"
                          placeholder="Description"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateService(service.id, editingItem)} 
                            disabled={saving}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                          >
                            {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button 
                            onClick={() => setEditingItem(null)} 
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingItem(service)} className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => deleteService(service.id)} className="text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{service.title}</p>
                        <p className="text-gray-500 text-sm">{service.description.substring(0, 150)}...</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'case-studies' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Case Studies ({caseStudies.length})</h2>
                {caseStudies.map((study) => (
                  <div key={study.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{study.title}</h3>
                        <p className="text-sm text-gray-500">{study.industry} • {study.category}</p>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => deleteCaseStudy(study.id)} className="text-red-600 hover:text-red-800">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm">{study.about.substring(0, 200)}...</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'testimonials' && (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Testimonials ({testimonials.length})</h2>
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition">
                    {editingItem?.id === testimonial.id ? (
                      <div className="space-y-4">
                        <input
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Name"
                        />
                        <input
                          type="text"
                          value={editingItem.role}
                          onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Role"
                        />
                        <input
                          type="text"
                          value={editingItem.company}
                          onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Company"
                        />
                        <textarea
                          value={editingItem.text}
                          onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          rows="4"
                          placeholder="Testimonial Text"
                        />
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateTestimonial(testimonial.id, editingItem)}
                            disabled={saving}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                          >
                            {saving ? 'Saving...' : 'Save'}
                          </button>
                          <button onClick={() => setEditingItem(null)} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                            <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.company}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingItem(testimonial)} className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => deleteTestimonial(testimonial.id)} className="text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 italic">"{testimonial.text}"</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'footer' && footerSettings && (
              <div className="max-w-4xl">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Footer Settings</h2>
                <div className="bg-white border border-gray-200 rounded-lg p-8 space-y-6">
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Company Description</label>
                    <textarea
                      value={footerSettings.company_description}
                      onChange={(e) => setFooterSettings({...footerSettings, company_description: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      rows="3"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="text"
                        value={footerSettings.phone}
                        onChange={(e) => setFooterSettings({...footerSettings, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        value={footerSettings.email}
                        onChange={(e) => setFooterSettings({...footerSettings, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Physical Address</label>
                    <input
                      type="text"
                      value={footerSettings.address}
                      onChange={(e) => setFooterSettings({...footerSettings, address: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-bold text-gray-800 mb-4">Social Media Links</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Facebook URL</label>
                        <input
                          type="url"
                          value={footerSettings.facebook_url}
                          onChange={(e) => setFooterSettings({...footerSettings, facebook_url: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://facebook.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Twitter URL</label>
                        <input
                          type="url"
                          value={footerSettings.twitter_url}
                          onChange={(e) => setFooterSettings({...footerSettings, twitter_url: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://twitter.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">LinkedIn URL</label>
                        <input
                          type="url"
                          value={footerSettings.linkedin_url}
                          onChange={(e) => setFooterSettings({...footerSettings, linkedin_url: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://linkedin.com/..."
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram URL</label>
                        <input
                          type="url"
                          value={footerSettings.instagram_url}
                          onChange={(e) => setFooterSettings({...footerSettings, instagram_url: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://instagram.com/..."
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      onClick={updateFooterSettings}
                      disabled={saving}
                      className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                    >
                      <Save size={20} />
                      {saving ? 'Saving...' : 'Save Footer Settings'}
                    </button>
                  </div>

                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
