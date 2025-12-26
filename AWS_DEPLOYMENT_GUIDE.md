# ☁️ AWS Free Tier Deployment Guide

This guide will help you deploy your e-commerce application to **AWS Free Tier** (completely free for 12 months!).

## 🎯 Why AWS + Docker?

- **Docker** = Containerization (makes deployment easier, portable)
- **AWS** = Cloud platform (where you run your containers/apps)
- **Best Practice**: Use Docker ON AWS (via ECS, Elastic Beanstalk, or EC2)
- **IBM Requirement**: AWS experience ✅ + Docker experience ✅ = Perfect!

---

## 💰 AWS Free Tier (12 Months Free)

### What's Included:
- **EC2** - 750 hours/month (t2.micro instance - perfect for your app)
- **S3** - 5GB storage (for images, static files)
- **RDS** - 750 hours/month (PostgreSQL/MySQL - optional)
- **Elastic Beanstalk** - Free (just pay for EC2)
- **CloudFront** - Free (first 50GB data transfer)

### Cost After 12 Months:
- ~$5-10/month for small apps (very affordable)

---

## 🚀 Deployment Options

### **Option 1: AWS Elastic Beanstalk (EASIEST - Recommended)**

Best for: Simple deployment, automatic scaling, health monitoring

**Advantages:**
- ✅ Free (only pay for EC2)
- ✅ Automatic deployment
- ✅ Health monitoring
- ✅ Easy to use
- ✅ Supports Docker!

---

### **Option 2: AWS EC2 + Docker**

Best for: Full control, learning experience

**Advantages:**
- ✅ Free tier eligible
- ✅ Full server control
- ✅ Run Docker containers
- ✅ Good for learning

---

### **Option 3: AWS ECS (Elastic Container Service)**

Best for: Production apps, advanced Docker orchestration

**Advantages:**
- ✅ Free (only pay for EC2)
- ✅ Managed Docker containers
- ✅ Auto-scaling
- ✅ More complex setup

---

## 📋 Prerequisites

1. **AWS Account** (create at aws.amazon.com)
   - Free tier includes $0 charges for eligible services
   - Need credit card (won't be charged if you stay in free tier)

2. **AWS CLI** installed:
   ```bash
   # macOS
   brew install awscli
   
   # Or download from: https://aws.amazon.com/cli/
   ```

3. **AWS EB CLI** (for Elastic Beanstalk):
   ```bash
   pip3 install awsebcli
   ```

---

## 🎯 Option 1: Deploy to AWS Elastic Beanstalk (Recommended)

### Step 1: Configure AWS CLI

```bash
aws configure
```

Enter:
- **AWS Access Key ID**: Get from AWS Console > IAM > Security Credentials
- **AWS Secret Access Key**: Get from AWS Console > IAM > Security Credentials
- **Default region**: `us-east-1` (or your preferred region)
- **Default output format**: `json`

### Step 2: Create Elastic Beanstalk Application

**For Backend:**

```bash
cd Backend
eb init -p docker ecommerce-backend --region us-east-1
```

**For Frontend:**

Since frontend is static, deploy to **S3 + CloudFront** instead (see Option 2 below).

---

### Step 3: Create Environment

```bash
cd Backend
eb create ecommerce-backend-env --instance-type t2.micro
```

This will:
- Create EC2 instance (free tier)
- Deploy your Docker container
- Set up load balancer
- Configure security groups

---

### Step 4: Set Environment Variables

```bash
eb setenv \
  MONGODB_URI=your_mongodb_uri \
  JWT_SECRETE=your_jwt_secret \
  CORS_ORIGIN=your_frontend_url \
  STRIPE_SECRET_KEY=your_stripe_key \
  PORT=8080
```

---

### Step 5: Deploy

```bash
eb deploy
```

Your backend is now live! Get the URL:
```bash
eb status
```

---

## 📦 Option 2: Deploy Frontend to S3 + CloudFront

### Step 1: Build Frontend

```bash
cd frontend
npm run build
```

### Step 2: Create S3 Bucket

```bash
aws s3 mb s3://your-app-name-frontend
```

### Step 3: Configure S3 Bucket for Static Website

```bash
aws s3 website s3://your-app-name-frontend \
  --index-document index.html \
  --error-document index.html
```

### Step 4: Upload Build Files

```bash
aws s3 sync dist/ s3://your-app-name-frontend --delete
```

### Step 5: Make Bucket Public (for static hosting)

```bash
aws s3api put-bucket-policy --bucket your-app-name-frontend --policy '{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-app-name-frontend/*"
    }
  ]
}'
```

### Step 6: Enable Static Website Hosting

```bash
aws s3api put-bucket-website \
  --bucket your-app-name-frontend \
  --website-configuration file://website-config.json
```

Create `website-config.json`:
```json
{
  "IndexDocument": {"Suffix": "index.html"},
  "ErrorDocument": {"Key": "index.html"}
}
```

Your frontend URL: `http://your-app-name-frontend.s3-website-us-east-1.amazonaws.com`

---

## 🖥️ Option 3: Deploy to EC2 (Manual Docker Deployment)

### Step 1: Launch EC2 Instance

1. Go to AWS Console > EC2 > Launch Instance
2. Choose **Amazon Linux 2023** (free tier eligible)
3. Instance type: **t2.micro** (free tier)
4. Configure security group:
   - SSH (port 22) from your IP
   - HTTP (port 80) from anywhere
   - Custom TCP (port 3000) from anywhere (for backend)
5. Launch and create/download key pair

### Step 2: Connect to EC2

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ec2-user@your-ec2-ip
```

### Step 3: Install Docker on EC2

```bash
sudo yum update -y
sudo yum install docker -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -a -G docker ec2-user

# Log out and back in for group to take effect
exit
```

### Step 4: Install Docker Compose

```bash
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
```

### Step 5: Clone and Deploy

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo

# Create .env file
nano Backend/.env
# Add your environment variables

# Run with Docker Compose
docker-compose up -d
```

---

## 🔧 Environment Variables Setup

### Backend (.env on AWS):

```env
PORT=8080
MONGODB_URI=your_mongodb_atlas_connection_string
JWT_SECRETE=your_jwt_secret
CORS_ORIGIN=https://your-frontend-url.com
STRIPE_SECRET_KEY=your_stripe_secret_key
NODE_ENV=production
```

### Frontend (.env for build):

```env
VITE_API_URL=https://your-backend-url.elasticbeanstalk.com/
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

---

## 📊 AWS Services You'll Use (All Free Tier Eligible)

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **EC2** | Run your backend server | 750 hours/month (12 months) |
| **S3** | Store frontend static files | 5GB storage |
| **CloudFront** | CDN for fast content delivery | 50GB data transfer |
| **Elastic Beanstalk** | Easy deployment platform | Free (just pay for EC2) |
| **RDS** (Optional) | PostgreSQL database | 750 hours/month (12 months) |

---

## 💰 Cost Breakdown

### Free Tier (First 12 Months):
- **EC2 t2.micro**: $0 (750 hours/month)
- **S3**: $0 (5GB storage)
- **CloudFront**: $0 (50GB transfer)
- **Elastic Beanstalk**: $0 (platform is free)

**Total: $0/month** 🎉

### After 12 Months (if you continue):
- **EC2 t2.micro**: ~$8-10/month (if running 24/7)
- **S3**: ~$0.50/month (for 5GB)
- **CloudFront**: ~$1-2/month (if you get traffic)

**Total: ~$10-12/month** (still very affordable!)

---

## ✅ Post-Deployment Checklist

- [ ] Backend deployed to Elastic Beanstalk/EC2
- [ ] Frontend deployed to S3
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] MongoDB Atlas whitelisted AWS IP
- [ ] Security groups configured
- [ ] Test all endpoints
- [ ] Monitor AWS costs (should be $0 for free tier)

---

## 🎯 For IBM Application - What to Say

### Resume/Interview Talking Points:

1. **"Deployed full-stack application to AWS using EC2 and S3"**
   - Shows cloud platform experience ✅

2. **"Containerized application with Docker and deployed to AWS Elastic Beanstalk"**
   - Shows both Docker AND AWS experience ✅

3. **"Leveraged AWS free tier services: EC2, S3, CloudFront"**
   - Shows cost-awareness and AWS knowledge ✅

4. **"Configured AWS security groups and IAM for secure deployment"**
   - Shows understanding of AWS security ✅

---

## 🆘 Troubleshooting

### Issue: "Instance type not eligible for free tier"
- **Solution**: Make sure you select **t2.micro** instance type

### Issue: "Exceeded free tier limits"
- **Solution**: Monitor usage in AWS Billing Dashboard
- Set up billing alerts

### Issue: "Connection timeout"
- **Solution**: Check security group rules (ports 80, 443, 3000)
- Verify security group is attached to instance

### Issue: "Docker not found"
- **Solution**: Install Docker on EC2 (see Step 3 in EC2 section)

---

## 📚 AWS Resources

- [AWS Free Tier](https://aws.amazon.com/free/)
- [Elastic Beanstalk Documentation](https://docs.aws.amazon.com/elasticbeanstalk/)
- [EC2 Documentation](https://docs.aws.amazon.com/ec2/)
- [S3 Documentation](https://docs.aws.amazon.com/s3/)
- [AWS CLI Documentation](https://docs.aws.amazon.com/cli/)

---

## 🚀 Quick Start Commands

```bash
# 1. Configure AWS
aws configure

# 2. Deploy Backend (Elastic Beanstalk)
cd Backend
eb init -p docker ecommerce-backend
eb create ecommerce-backend-env --instance-type t2.micro
eb deploy

# 3. Build Frontend
cd ../frontend
npm run build

# 4. Deploy Frontend (S3)
aws s3 mb s3://your-app-frontend
aws s3 sync dist/ s3://your-app-frontend --delete
aws s3api put-bucket-policy --bucket your-app-frontend --policy file://policy.json

# 5. Get URLs
eb status  # Backend URL
aws s3api get-bucket-website --bucket your-app-frontend  # Frontend URL
```

---

**Your app is now on AWS Free Tier! Perfect for IBM application! 🎉**

