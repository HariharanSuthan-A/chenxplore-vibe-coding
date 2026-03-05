import { Navbar, initNavbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { supabase } from '../supabase';

interface FormErrors {
  project_name?: string;
  description?: string;
  team_name?: string;
  email?: string;
  media?: string;
}

let selectedFiles: File[] = [];
let previewUrls: string[] = [];

export function SubmitPage(): string {
  return `
    ${Navbar()}
    <main class="submit-page">
      <div class="container">
        <div class="form-wrapper">
          <div class="form-header">
            <span class="section-badge">Project Submission</span>
            <h1 class="form-title">Submit Your Project</h1>
            <p class="form-subtitle">Fill in the details below to submit your project for the Chen Explore-2k26 competition.</p>
          </div>

          <form id="project-form" class="project-form" novalidate>
            <!-- Project Name -->
            <div class="form-group" id="fg-project-name">
              <label for="project_name" class="form-label">
                Project Name <span class="required">*</span>
              </label>
              <input
                type="text"
                id="project_name"
                name="project_name"
                class="form-input"
                placeholder="Enter your project name"
                required
              />
              <span class="form-error" id="error-project_name"></span>
            </div>

            <!-- Project Description -->
            <div class="form-group" id="fg-description">
              <label for="description" class="form-label">
                Project Description <span class="required">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                class="form-input form-textarea"
                placeholder="Describe your project, its features, and what it does..."
                rows="5"
                required
              ></textarea>
              <span class="form-error" id="error-description"></span>
            </div>

            <!-- Team Name -->
            <div class="form-group" id="fg-team-name">
              <label for="team_name" class="form-label">
                Team Name <span class="required">*</span>
              </label>
              <input
                type="text"
                id="team_name"
                name="team_name"
                class="form-input"
                placeholder="Enter your team name"
                required
              />
              <span class="form-error" id="error-team_name"></span>
            </div>

            <!-- Email -->
            <div class="form-group" id="fg-email">
              <label for="email" class="form-label">
                Email (Any one team member) <span class="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                class="form-input"
                placeholder="team@example.com"
                required
              />
              <span class="form-error" id="error-email"></span>
            </div>

            <div class="form-divider"></div>

            <!-- Project URL -->
            <div class="form-group" id="fg-project-url">
              <label for="project_url" class="form-label">
                Project URL
                <span class="optional-tag">Optional</span>
              </label>
              <input
                type="url"
                id="project_url"
                name="project_url"
                class="form-input"
                placeholder="https://your-project.com"
              />
              <p class="form-hint">If your project is hosted, provide the URL here.</p>
            </div>

            <!-- Screenshots -->
            <div class="form-group" id="fg-screenshots">
              <label class="form-label">
                Screenshots
                <span class="optional-tag">Optional</span>
              </label>
              <p class="form-hint">Upload up to 5 screenshots (JPG, PNG). Required if no Project URL is provided.</p>

              <div class="upload-area" id="upload-area">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="17 8 12 3 7 8"/>
                  <line x1="12" y1="3" x2="12" y2="15"/>
                </svg>
                <p class="upload-text">Drag & drop images here or <span class="upload-link">browse</span></p>
                <p class="upload-hint">JPG, PNG — Max 5MB per file (Up to 5 files)</p>
                <input
                  type="file"
                  id="screenshot-input"
                  accept=".jpg,.jpeg,.png"
                  multiple
                  hidden
                />
              </div>

              <div class="preview-grid" id="preview-grid"></div>
              <span class="form-error" id="error-media"></span>
            </div>

            <div class="form-divider"></div>

            <!-- Submit Button -->
            <div class="form-actions">
              <button type="submit" class="btn btn-primary btn-lg btn-submit" id="submit-btn">
                <span class="btn-text">Submit Project</span>
                <span class="btn-loader" id="btn-loader">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
                </span>
              </button>
            </div>
          </form>

          <!-- Success Message -->
          <div class="success-message" id="success-message">
            <div class="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
            <h2>Project Submitted Successfully!</h2>
            <p>Your project has been submitted for the Chen Explore-2k26 competition. Good luck!</p>
            <button class="btn btn-outline" id="submit-another-btn">Submit Another Project</button>
          </div>
        </div>
      </div>
    </main>
    ${Footer()}
  `;
}

function validateForm(): FormErrors {
  const errors: FormErrors = {};

  const projectName = (document.getElementById('project_name') as HTMLInputElement)?.value.trim();
  const description = (document.getElementById('description') as HTMLTextAreaElement)?.value.trim();
  const teamName = (document.getElementById('team_name') as HTMLInputElement)?.value.trim();
  const email = (document.getElementById('email') as HTMLInputElement)?.value.trim();
  const projectUrl = (document.getElementById('project_url') as HTMLInputElement)?.value.trim();

  if (!projectName) {
    errors.project_name = 'Project name is required';
  }

  if (!description) {
    errors.description = 'Project description is required';
  }

  if (!teamName) {
    errors.team_name = 'Team name is required';
  }

  if (!email) {
    errors.email = 'Email is required';
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
  }

  // Either project URL or at least 1 screenshot required
  if (!projectUrl && selectedFiles.length === 0) {
    errors.media = 'Either a Project URL or at least 1 screenshot is required';
  }

  // Validate URL format if provided
  if (projectUrl) {
    try {
      new URL(projectUrl);
    } catch {
      errors.media = 'Please enter a valid URL';
    }
  }

  return errors;
}

function showErrors(errors: FormErrors) {
  // Clear all errors first
  document.querySelectorAll('.form-error').forEach(el => {
    el.textContent = '';
  });
  document.querySelectorAll('.form-group').forEach(el => {
    el.classList.remove('has-error');
  });

  // Show specific errors
  if (errors.project_name) {
    const el = document.getElementById('error-project_name');
    const fg = document.getElementById('fg-project-name');
    if (el) el.textContent = errors.project_name;
    if (fg) fg.classList.add('has-error');
  }
  if (errors.description) {
    const el = document.getElementById('error-description');
    const fg = document.getElementById('fg-description');
    if (el) el.textContent = errors.description;
    if (fg) fg.classList.add('has-error');
  }
  if (errors.team_name) {
    const el = document.getElementById('error-team_name');
    const fg = document.getElementById('fg-team-name');
    if (el) el.textContent = errors.team_name;
    if (fg) fg.classList.add('has-error');
  }
  if (errors.email) {
    const el = document.getElementById('error-email');
    const fg = document.getElementById('fg-email');
    if (el) el.textContent = errors.email;
    if (fg) fg.classList.add('has-error');
  }
  if (errors.media) {
    const el = document.getElementById('error-media');
    const fg = document.getElementById('fg-screenshots');
    if (el) el.textContent = errors.media;
    if (fg) fg.classList.add('has-error');
  }
}

function renderPreviews() {
  const grid = document.getElementById('preview-grid');
  if (!grid) return;

  grid.innerHTML = previewUrls.map((url, index) => `
    <div class="preview-item" id="preview-${index}">
      <img src="${url}" alt="Screenshot ${index + 1}" />
      <button type="button" class="preview-remove" data-index="${index}" aria-label="Remove screenshot">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  `).join('');

  // Attach remove handlers
  grid.querySelectorAll('.preview-remove').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt((e.currentTarget as HTMLElement).getAttribute('data-index') || '0');
      selectedFiles.splice(index, 1);
      previewUrls.splice(index, 1);
      renderPreviews();
    });
  });
}

function handleFiles(files: FileList) {
  const remaining = 5 - selectedFiles.length;
  const newFiles = Array.from(files).slice(0, remaining);

  for (const file of newFiles) {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert(`File ${file.name} is not a supported format (JPG, PNG, WEBP)`);
      continue;
    }

    // Limit size to 5MB (Supabase free tier default storage limit)
    if (file.size > 5 * 1024 * 1024) {
      alert(`File ${file.name} is too large. Max size is 5MB.`);
      continue;
    }

    if (selectedFiles.length >= 5) break;

    selectedFiles.push(file);
    const url = URL.createObjectURL(file);
    previewUrls.push(url);
  }

  renderPreviews();
}

async function uploadScreenshots(): Promise<string[]> {
  const urls: string[] = [];

  for (const file of selectedFiles) {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
    const filePath = `screenshots/${fileName}`;

    try {
      const { error } = await supabase.storage
        .from('project-screenshots')
        .upload(filePath, file);

      if (error) {
        console.error('Upload error detail:', error);
        if (error.message.includes('bucket not found')) {
          throw new Error("Supabase Storage bucket 'project-screenshots' not found. Please create it and make it public.");
        } else if (error.message.includes('Row-level security policy')) {
          throw new Error("Supabase Storage permission denied. Please add an RLS policy for anonymous uploads.");
        }
        throw new Error(`Failed to upload ${file.name}: ${error.message}`);
      }

      const { data: urlData } = supabase.storage
        .from('project-screenshots')
        .getPublicUrl(filePath);

      urls.push(urlData.publicUrl);
    } catch (err: any) {
      console.error('Caught upload error:', err);
      throw err;
    }
  }

  return urls;
}

async function handleSubmit(e: Event) {
  e.preventDefault();

  const errors = validateForm();
  if (Object.keys(errors).length > 0) {
    showErrors(errors);
    // Scroll to first error
    const firstError = document.querySelector('.has-error');
    if (firstError) {
      firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return;
  }

  // Show loading state
  const submitBtn = document.getElementById('submit-btn') as HTMLButtonElement;
  const btnText = submitBtn.querySelector('.btn-text') as HTMLElement;
  const btnLoader = document.getElementById('btn-loader') as HTMLElement;

  submitBtn.disabled = true;
  btnText.textContent = 'Submitting...';
  btnLoader.style.display = 'inline-flex';

  try {
    // Upload screenshots if any
    let screenshotUrls: string[] = [];
    if (selectedFiles.length > 0) {
      screenshotUrls = await uploadScreenshots();
    }

    // Get form values
    const projectName = (document.getElementById('project_name') as HTMLInputElement).value.trim();
    const description = (document.getElementById('description') as HTMLTextAreaElement).value.trim();
    const teamName = (document.getElementById('team_name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const projectUrl = (document.getElementById('project_url') as HTMLInputElement).value.trim();

    // Insert into Supabase
    const { error } = await supabase
      .from('projects')
      .insert({
        project_name: projectName,
        description: description,
        team_name: teamName,
        email: email,
        project_url: projectUrl || null,
        screenshots: screenshotUrls,
      });

    if (error) {
      throw error;
    }

    // Show success
    const form = document.getElementById('project-form') as HTMLElement;
    const successMessage = document.getElementById('success-message') as HTMLElement;
    form.style.display = 'none';
    successMessage.style.display = 'block';

    // Reset state
    selectedFiles = [];
    previewUrls = [];

  } catch (error: any) {
    console.error('Submission error:', error);
    alert(`Error submitting your project: ${error.message || 'Please try again.'}`);
  } finally {
    submitBtn.disabled = false;
    btnText.textContent = 'Submit Project';
    btnLoader.style.display = 'none';
  }
}

export function initSubmitPage() {
  initNavbar();

  // Reset file state
  selectedFiles = [];
  previewUrls = [];

  const form = document.getElementById('project-form');
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('screenshot-input') as HTMLInputElement;

  // Form submission
  form?.addEventListener('submit', handleSubmit);

  // Upload area click
  uploadArea?.addEventListener('click', () => {
    fileInput?.click();
  });

  // File input change
  fileInput?.addEventListener('change', () => {
    if (fileInput.files) {
      handleFiles(fileInput.files);
    }
  });

  // Drag and drop
  uploadArea?.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
  });

  uploadArea?.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
  });

  uploadArea?.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    if ((e as DragEvent).dataTransfer?.files) {
      handleFiles((e as DragEvent).dataTransfer!.files);
    }
  });

  // Submit another
  const submitAnotherBtn = document.getElementById('submit-another-btn');
  submitAnotherBtn?.addEventListener('click', () => {
    const form = document.getElementById('project-form') as HTMLFormElement;
    const successMessage = document.getElementById('success-message') as HTMLElement;

    form.style.display = 'block';
    successMessage.style.display = 'none';
    form.reset();
    selectedFiles = [];
    previewUrls = [];
    renderPreviews();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
