# 🚀 AWS Free Tier Quick Start Guide

## ⚡ Fastest Way to Deploy to AWS (15 minutes)

### Step 1: Create AWS Account
1. Go to [aws.amazon.com](https://aws.amazon.com)
2. Click "Create an AWS Account"
3. Enter email, password, account name
4. Add credit card (won't be charged if you stay in free tier)
5. Verify phone number

### Step 2: Install AWS CLI

**macOS:**
```bash
brew install awscli
```

**Or download:** https://aws.amazon.com/cli/

### Step 3: Get AWS Credentials

1. Go to AWS Console
2. Click your name (top right) > Security credentials
3. Click "Access keys" > "Create access key"
4. Download the key (CSV file)
5. Save Access Key ID and Secret Access Key

### Step 4: Configure AWS CLI

```bash
aws configure
```

Enter:
- Access Key ID: (from Step 3)
- Secret Access Key: (from Step 3)
- Region: `us-east-1`
- Output format: `json`

### Step 5: Install Elastic Beanstalk CLI

```bash
pip3 install awsebcli
```

### Step 6: Deploy Backend to AWS

```bash
cd Backend

# Initialize Elastic Beanstalk
eb init -p docker ecommerce-backend --region us-east-1

# Create environment (this takes 5-10 minutes)
eb create ecommerce-backend-env --instance-type t2.micro

# Set environment variables
eb setenv \
  MONGODB_URI="your_mongodb_uri" \
  JWT_SECRETE="your_jwt_secret" \
  CORS_ORIGIN="http://localhost:5173" \
  STRIPE_SECRET_KEY="your_stripe_key"

# Deploy
eb deploy
```

**Get your backend URL:**
```bash
eb status
```

### Step 7: Deploy Frontend to S3

```bash
cd ../frontend

# Update .env with backend URL
echo "VITE_API_URL=https://your-backend-url.elasticbeanstalk.com/" > .env
echo "VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_key" >> .env

# Build frontend
npm run build

# Create S3 bucket
aws s3 mb s3://ecommerce-frontend-yourname

# Upload files
aws s3 sync dist/ s3://ecommerce-frontend-yourname --delete

# Enable static website hosting
aws s3 website s3://ecommerce-frontend-yourname --index-document index.html --error-document index.html

# Make bucket public
aws s3api put-bucket-policy --bucket ecommerce-frontend-yourname --policy '{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": "*",
    "Action": "s3:GetObject",
    "Resource": "arn:aws:s3:::ecommerce-frontend-yourname/*"
  }]
}'
```

**Your frontend URL:**
```
http://ecommerce-frontend-yourname.s3-website-us-east-1.amazonaws.com
```

### Step 8: Update Backend CORS

```bash
cd Backend
eb setenv CORS_ORIGIN="http://ecommerce-frontend-yourname.s3-website-us-east-1.amazonaws.com"
eb deploy
```

---

## ✅ Done!

- ✅ Backend: Running on AWS Elastic Beanstalk (EC2)
- ✅ Frontend: Running on AWS S3
- ✅ Cost: $0/month (free tier)
- ✅ Perfect for IBM application!

---

## 🎯 What You Can Say in Interview

**"I deployed my full-stack e-commerce application to AWS using:**
- **EC2/Elastic Beanstalk** for the backend server
- **S3** for frontend static hosting
- **Docker** for containerization
- **AWS Free Tier** for cost-effective deployment

This demonstrates my experience with cloud platforms and container technologies."

---

## 📊 AWS Services Used

| Service | What It Does | Cost |
|---------|--------------|------|
| EC2 (via EB) | Runs your backend server | FREE (750 hrs/month) |
| S3 | Stores frontend files | FREE (5GB storage) |
| Elastic Beanstalk | Deployment platform | FREE (just EC2) |

**Total: $0/month for 12 months!** 🎉

---

See [AWS_DEPLOYMENT_GUIDE.md](./AWS_DEPLOYMENT_GUIDE.md) for detailed instructions.

