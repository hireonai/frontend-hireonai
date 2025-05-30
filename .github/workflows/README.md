# GitHub Workflows for HireOn

## Cloud Run Deployment Workflow

This repository includes a GitHub Actions workflow that automatically deploys the application to Google Cloud Run when code is pushed to the main branch.

### Required GitHub Secrets

To make the workflow function properly, you need to add the following secrets in your GitHub repository:

1. `GCP_PROJECT_ID`: Your Google Cloud Platform project ID
2. `GCP_DEPLOY_SA_KEY`: The JSON service account key for deployment (with permissions for Cloud Run and Container Registry)

### Setting Up GitHub Secrets

1. Go to your GitHub repository
2. Click on "Settings" tab
3. In the left sidebar, click on "Secrets and variables" then "Actions"
4. Click on "New repository secret"
5. Add each of the required secrets with their respective values

### Setting Up Google Cloud Service Account

1. Create a service account in Google Cloud with necessary permissions:
   - Cloud Run Admin
   - Storage Admin
   - Service Account User
   - Cloud Build Editor

2. Create and download a JSON key for this service account:
   ```bash
   # Create a service account
   gcloud iam service-accounts create github-deploy-sa \
     --display-name="GitHub Deployment Service Account"

   # Grant necessary permissions
   gcloud projects add-iam-policy-binding [YOUR_PROJECT_ID] \
     --member="serviceAccount:github-deploy-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com" \
     --role="roles/run.admin"

   gcloud projects add-iam-policy-binding [YOUR_PROJECT_ID] \
     --member="serviceAccount:github-deploy-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com" \
     --role="roles/storage.admin"

   gcloud projects add-iam-policy-binding [YOUR_PROJECT_ID] \
     --member="serviceAccount:github-deploy-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com" \
     --role="roles/iam.serviceAccountUser"

   gcloud projects add-iam-policy-binding [YOUR_PROJECT_ID] \
     --member="serviceAccount:github-deploy-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com" \
     --role="roles/cloudbuild.builds.editor"

   # Create and download the key
   gcloud iam service-accounts keys create key.json \
     --iam-account=github-deploy-sa@[YOUR_PROJECT_ID].iam.gserviceaccount.com
   ```

3. Copy the contents of the downloaded `key.json` file
4. Add the contents as the value for the `GCP_DEPLOY_SA_KEY` secret in GitHub 