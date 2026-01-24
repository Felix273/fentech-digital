'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, Trash2, Edit, X, Upload, LogOut } from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('services');
  const [services, setServices] = useState([]);
  const [caseStudies, setCaseStudies] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [editingItem, setEditingItem] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (auth !== 'true') {
      router.push('/login');
    } else {
      setIsAuthenticated(true);
      loadData();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/login');
  };

  const loadData = async () => {
    try {
      const servicesModule = await import('@/lib/data/services');
      const caseStudiesModule = await import('@/lib/data/case-studies');
      const testimonialsModule = await import('@/lib/data/testimonials');

      const savedServices = localStorage.getItem('services');
      const savedCaseStudies = localStorage.getItem('caseStudies');
      const savedTestimonials = localStorage.getItem('testimonials');

      setServices(savedServices ? JSON.parse(savedServices) : servicesModule.servicesData);
      setCaseStudies(savedCaseStudies ? JSON.parse(savedCaseStudies) : caseStudiesModule.caseStudiesData);
      setTestimonials(savedTestimonials ? JSON.parse(savedTestimonials) : testimonialsModule.testimonialsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const saveData = () => {
    localStorage.setItem('services', JSON.stringify(services));
    localStorage.setItem('caseStudies', JSON.stringify(caseStudies));
    localStorage.setItem('testimonials', JSON.stringify(testimonials));
    alert('✅ Data saved successfully!');
  };

  const deleteItem = (id, type) => {
    if (!confirm('Are you sure you want to delete this item?')) return;
    
    if (type === 'service') setServices(services.filter(s => s.id !== id));
    if (type === 'caseStudy') setCaseStudies(caseStudies.filter(c => c.id !== id));
    if (type === 'testimonial') setTestimonials(testimonials.filter(t => t.id !== id));
  };

  const updateItem = (id, updates, type) => {
    if (type === 'service') {
      setServices(services.map(s => s.id === id ? { ...s, ...updates } : s));
    }
    if (type === 'caseStudy') {
      setCaseStudies(caseStudies.map(c => c.id === id ? { ...c, ...updates } : c));
    }
    if (type === 'testimonial') {
      setTestimonials(testimonials.map(t => t.id === id ? { ...t, ...updates } : t));
    }
    setEditingItem(null);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditingItem({ ...editingItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Array field handlers for case studies
  const addArrayItem = (field, defaultValue = '') => {
    setEditingItem({
      ...editingItem,
      [field]: [...(editingItem[field] || []), defaultValue]
    });
  };

  const updateArrayItem = (field, index, value) => {
    const newArray = [...editingItem[field]];
    newArray[index] = value;
    setEditingItem({ ...editingItem, [field]: newArray });
  };

  const removeArrayItem = (field, index) => {
    setEditingItem({
      ...editingItem,
      [field]: editingItem[field].filter((_, i) => i !== index)
    });
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Fentech Admin Dashboard</h1>
            <div className="flex gap-3">
              <button onClick={saveData} className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold">
                <Save size={20} /> Save All Changes
              </button>
              <button onClick={handleLogout} className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold">
                <LogOut size={20} /> Logout
              </button>
            </div>
          </div>

          <div className="flex gap-4 mb-8 border-b">
            {[
              { key: 'services', label: 'Services' },
              { key: 'case-studies', label: 'Case Studies' },
              { key: 'testimonials', label: 'Testimonials' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 font-semibold ${
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
                          rows={4}
                          placeholder="Description"
                        />
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                          <button onClick={() => updateItem(service.id, editingItem, 'service')} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700">
                            Save
                          </button>
                          <button onClick={() => setEditingItem(null)} className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500">
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
                            <button onClick={() => deleteItem(service.id, 'service')} className="text-red-600 hover:text-red-800">
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
                    {editingItem?.id === study.id ? (
                      <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            value={editingItem.title || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Title"
                          />
                          <input
                            type="text"
                            value={editingItem.category || ''}
                            onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                            className="w-full px-4 py-2 border rounded-lg"
                            placeholder="Category"
                          />
                        </div>
                        
                        <input
                          type="text"
                          value={editingItem.industry || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, industry: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          placeholder="Industry"
                        />
                        
                        <textarea
                          value={editingItem.about || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, about: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          rows={3}
                          placeholder="About"
                        />

                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                          <button 
                            onClick={() => updateItem(study.id, editingItem, 'caseStudy')} 
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
                          >
                            Save Changes
                          </button>
                          <button 
                            onClick={() => setEditingItem(null)} 
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{study.title}</h3>
                            <p className="text-sm text-gray-500">{study.industry} • {study.category}</p>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingItem(study)} className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => deleteItem(study.id, 'caseStudy')} className="text-red-600 hover:text-red-800">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm">{study.about.substring(0, 200)}...</p>
                      </div>
                    )}
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
                        <div className="flex gap-4 items-start">
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300 bg-gray-100">
                              {editingItem.image ? (
                                <img src={editingItem.image} alt="Preview" className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                  <Upload size={32} />
                                </div>
                              )}
                            </div>
                            <label className="mt-2 block">
                              <span className="sr-only">Choose profile photo</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                              />
                            </label>
                          </div>
                          <div className="flex-1 space-y-4">
                            <input
                              type="text"
                              value={editingItem.name || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                              className="w-full px-4 py-2 border rounded-lg"
                              placeholder="Name"
                            />
                            <input
                              type="text"
                              value={editingItem.role || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                              className="w-full px-4 py-2 border rounded-lg"
                              placeholder="Role"
                            />
                            <input
                              type="text"
                              value={editingItem.company || ''}
                              onChange={(e) => setEditingItem({ ...editingItem, company: e.target.value })}
                              className="w-full px-4 py-2 border rounded-lg"
                              placeholder="Company"
                            />
                          </div>
                        </div>
                        <textarea
                          value={editingItem.text || ''}
                          onChange={(e) => setEditingItem({ ...editingItem, text: e.target.value })}
                          className="w-full px-4 py-2 border rounded-lg"
                          rows={4}
                          placeholder="Testimonial Text"
                        />
                        <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                          <button 
                            onClick={() => updateItem(testimonial.id, editingItem, 'testimonial')} 
                            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 font-semibold"
                          >
                            Save Changes
                          </button>
                          <button 
                            onClick={() => setEditingItem(null)} 
                            className="bg-gray-400 text-white px-6 py-2 rounded-lg hover:bg-gray-500 font-semibold"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex gap-4 items-center">
                            <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
                            <div>
                              <h3 className="text-xl font-bold text-gray-900">{testimonial.name}</h3>
                              <p className="text-sm text-gray-500">{testimonial.role} • {testimonial.company}</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button onClick={() => setEditingItem(testimonial)} className="text-blue-600 hover:text-blue-800">
                              <Edit size={18} />
                            </button>
                            <button onClick={() => deleteItem(testimonial.id, 'testimonial')} className="text-red-600 hover:text-red-800">
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
          </div>
        </div>
      </div>
    </div>
  );
}
