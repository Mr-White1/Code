import React, { useState } from 'react';
import { Upload, AlertTriangle } from 'lucide-react';

const ReportSubmission: React.FC = () => {
  const [formData, setFormData] = useState({
    program: '',
    title: '',
    severity: 'medium',
    description: '',
    stepsToReproduce: '',
    impact: '',
    attachments: [] as File[]
  });

  // Add state for file upload errors
  const [uploadErrors, setUploadErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting report:', formData);
    // Handle form submission
  };

  const validateFile = (file: File): string | null => {
    // File size validation (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return `File "${file.name}" is too large. Maximum size is 10MB.`;
    }

    // MIME type validation - only allow specific safe file types
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/webm', 'video/quicktime',
      'text/plain', 'application/pdf',
      'application/zip', 'application/x-zip-compressed'
    ];
    
    if (!allowedTypes.includes(file.type)) {
      return `File type "${file.type}" is not allowed for "${file.name}".`;
    }

    // File extension validation (double-check against MIME type spoofing)
    const fileName = file.name.toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.mp4', '.webm', '.mov', '.txt', '.pdf', '.zip'];
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      return `File extension is not allowed for "${file.name}".`;
    }

    // Additional security check: prevent executable files
    const dangerousExtensions = ['.exe', '.bat', '.cmd', '.scr', '.pif', '.com', '.js', '.jar', '.vbs', '.sh'];
    const hasDangerousExtension = dangerousExtensions.some(ext => fileName.includes(ext));
    
    if (hasDangerousExtension) {
      return `File "${file.name}" contains potentially dangerous content and cannot be uploaded.`;
    }

    return null; // File is valid
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const errors: string[] = [];
      const validFiles: File[] = [];

      // Validate each file
      files.forEach(file => {
        const error = validateFile(file);
        if (error) {
          errors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      // Update errors state
      setUploadErrors(errors);

      // Only add valid files
      if (validFiles.length > 0) {
        setFormData({
          ...formData,
          attachments: [...formData.attachments, ...validFiles]
        });
      }

      // Clear the input value to allow re-uploading the same file if needed
      e.target.value = '';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Submit Security Report</h1>
        <p className="text-gray-600">Report a security vulnerability you've discovered</p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="font-medium text-blue-900">Before you submit</h3>
            <p className="text-sm text-blue-700 mt-1">
              Make sure you've read the program's scope and rules. Only test on authorized targets and never access or modify data without permission.
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Bug Bounty Program *
            </label>
            <select
              value={formData.program}
              onChange={(e) => setFormData({ ...formData, program: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="">Select a program</option>
              <option value="techcorp">TechCorp Web Security</option>
              <option value="webapp">WebApp Security Program</option>
              <option value="mobile">Mobile Security Challenge</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vulnerability Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., SQL Injection in User Search"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Severity Level *
            </label>
            <div className="grid grid-cols-4 gap-3">
              {['low', 'medium', 'high', 'critical'].map((severity) => (
                <label key={severity} className="relative">
                  <input
                    type="radio"
                    name="severity"
                    value={severity}
                    checked={formData.severity === severity}
                    onChange={(e) => setFormData({ ...formData, severity: e.target.value })}
                    className="sr-only"
                  />
                  <div className={`p-3 text-center rounded-lg border-2 cursor-pointer transition-colors ${
                    formData.severity === severity
                      ? severity === 'critical' ? 'border-red-500 bg-red-50 text-red-700' :
                        severity === 'high' ? 'border-orange-500 bg-orange-50 text-orange-700' :
                        severity === 'medium' ? 'border-yellow-500 bg-yellow-50 text-yellow-700' :
                        'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
                  }`}>
                    <p className="font-medium capitalize">{severity}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Vulnerability Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the vulnerability in detail..."
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Steps to Reproduce *
            </label>
            <textarea
              value={formData.stepsToReproduce}
              onChange={(e) => setFormData({ ...formData, stepsToReproduce: e.target.value })}
              placeholder="1. Go to...&#10;2. Click on...&#10;3. Enter..."
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Impact Assessment *
            </label>
            <textarea
              value={formData.impact}
              onChange={(e) => setFormData({ ...formData, impact: e.target.value })}
              placeholder="Explain the potential impact of this vulnerability..."
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload screenshots, videos, or proof-of-concept files</p>
              <p className="text-xs text-gray-500 mb-2">Max file size: 10MB. Allowed types: Images, Videos, Text, PDF, ZIP</p>
              <input
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                accept="image/*,video/mp4,video/webm,video/quicktime,.txt,.pdf,.zip"
              />
              <label
                htmlFor="file-upload"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors"
              >
                Choose Files
              </label>
            </div>
            
            {/* Display upload errors */}
            {uploadErrors.length > 0 && (
              <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">Upload Errors</h3>
                    <div className="mt-2 text-sm text-red-700">
                      <ul className="list-disc pl-5 space-y-1">
                        {uploadErrors.map((error, index) => (
                          <li key={index}>{error}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {formData.attachments.length > 0 && (
              <div className="mt-3 space-y-2">
                {formData.attachments.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-700">{file.name}</span>
                      <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const newAttachments = formData.attachments.filter((_, i) => i !== index);
                        setFormData({ ...formData, attachments: newAttachments });
                      }}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-xl">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-600">
              By submitting, you agree to our responsible disclosure policy
            </p>
            <div className="flex space-x-3">
              <button
                type="button"
                className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Save Draft
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ReportSubmission;