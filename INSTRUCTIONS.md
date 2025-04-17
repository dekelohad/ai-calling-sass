# AI Calling SASS Project Documentation

## Project Overview
This is a Next.js project that provides an AI-powered calling system for businesses. The system helps businesses never miss a call by using AI agents to handle calls when businesses are unavailable, collect lead information, and forward it to the business through SMS/email.

## Tech Stack
- Next.js 15.2.4
- React 19
- TypeScript
- Tailwind CSS
- Shadcn UI
- Radix UI
- SCSS
- Firebase (Database, Authentication, Storage & Functions)
- Twilio (Phone Numbers & Call Handling)
- OpenAI (Spam Classification)
- Vapi/Retell (Voice AI Agents)
- pnpm (package manager)

## Implementation Plan

### Phase 1: Project Setup and Basic Infrastructure
- [x] Initialize Next.js project with TypeScript
- [x] Set up Tailwind CSS and SCSS
- [x] Configure Shadcn UI
- [x] Set up project structure
- [x] Create environment variables template
- [x] Set up Git repository
- [x] Configure ESLint and Prettier

### Phase 2: Database and Authentication
- [x] Set up Firebase project
- [x] Create Firestore collections (Complex task - Completed):
  - [x] Businesses (with business hours and notification preferences)
  - [x] Phone Numbers (with Twilio integration)
  - [x] Leads (with spam detection)
  - [x] Calls (with recording and transcription)
- [x] Set up Firebase Security Rules
- [x] Configure Firebase Authentication
- [x] Create authentication components:
  - [x] Sign Up (with validation and error handling)
  - [x] Sign In (with error handling and loading states)
  - [x] Password Reset (with success states)
  - [x] Profile Management (via auth store)

### Phase 3: Business Management
- [ ] Create business profile components:
  - [ ] Business Profile Form
  - [ ] Business Hours Configuration
  - [ ] Notification Preferences
- [ ] Implement business dashboard:
  - [ ] Overview statistics
  - [ ] Recent calls
  - [ ] Lead management
- [ ] Set up business settings:
  - [ ] Profile settings
  - [ ] Notification settings
  - [ ] Call handling preferences

### Phase 4: Phone Number Management
- [ ] Set up Twilio integration:
  - [ ] Configure Twilio client
  - [ ] Set up webhook endpoints
  - [ ] Implement number purchasing
- [ ] Create phone number components:
  - [ ] Number search and purchase
  - [ ] Number management dashboard
  - [ ] Number status monitoring
- [ ] Implement number settings:
  - [ ] Call forwarding rules
  - [ ] Business hours routing
  - [ ] Voicemail settings

### Phase 5: AI Call Handling
- [ ] Set up Vapi/Retell integration:
  - [ ] Configure AI agent
  - [ ] Set up call handling
  - [ ] Implement real-time processing
- [ ] Create call handling components:
  - [ ] Call dashboard
  - [ ] Call recording player
  - [ ] Transcription viewer
- [ ] Implement OpenAI integration:
  - [ ] Spam detection
  - [ ] Call transcription
  - [ ] Call summary generation

### Phase 6: Lead Management
- [ ] Create lead components:
  - [ ] Lead capture form
  - [ ] Lead dashboard
  - [ ] Lead details view
- [ ] Implement lead processing system:
  - [ ] ChatGPT integration for spam detection
  - [ ] Two-step verification process
  - [ ] Spam pattern recognition
  - [ ] Feedback loop for accuracy improvement
- [ ] Implement lead notification system:
  - [ ] Email notifications (for legitimate leads only)
  - [ ] SMS notifications (for legitimate leads only)
- [ ] Set up lead export functionality:
  - [ ] CSV export
  - [ ] PDF export
- [ ] Implement spam detection customization:
  - [ ] Business-specific spam criteria
  - [ ] Manual review interface
  - [ ] Spam detection analytics

### Phase 7: Analytics and Reporting
- [ ] Create analytics dashboard:
  - [ ] Call statistics
  - [ ] Lead conversion rates
  - [ ] AI performance metrics
- [ ] Implement reporting features:
  - [ ] Custom report generation
  - [ ] Scheduled reports
  - [ ] Export functionality

### Phase 8: Testing and Optimization
- [ ] Write unit tests:
  - [ ] Component tests
  - [ ] Integration tests
  - [ ] API tests
- [ ] Performance optimization:
  - [ ] Code splitting
  - [ ] Image optimization
  - [ ] API caching
- [ ] Security audit:
  - [ ] Authentication review
  - [ ] API security
  - [ ] Data protection

### Phase 9: Deployment and Documentation
- [ ] Set up production environment:
  - [ ] Configure production database
  - [ ] Set up production API keys
  - [ ] Configure production webhooks
- [ ] Create documentation:
  - [ ] User guide
  - [ ] API documentation
  - [ ] Deployment guide
- [ ] Deploy to production:
  - [ ] Build optimization
  - [ ] Environment configuration
  - [ ] Final testing

### Phase 10: Monitoring and Maintenance
- [ ] Set up monitoring:
  - [ ] Error tracking
  - [ ] Performance monitoring
  - [ ] Usage analytics
- [ ] Create maintenance procedures:
  - [ ] Backup procedures
  - [ ] Update procedures
  - [ ] Emergency procedures
- [ ] Implement automated alerts:
  - [ ] Error alerts
  - [ ] Performance alerts
  - [ ] Security alerts

## Core Features
1. **Phone Number Management**
   - Add existing Twilio numbers
   - Search and purchase new Twilio numbers
   - Number management dashboard
   - Number status monitoring

2. **Business Management**
   - Business profile creation
   - Business hours configuration
   - Call handling preferences
   - Lead notification preferences

3. **AI Call Handling**
   - Automated call answering
   - Lead information collection
   - Spam call detection
   - Call transcription
   - Call recording storage

4. **Lead Management**
   - Lead information storage
   - Lead notification system (SMS/Email)
   - Lead dashboard
   - Lead export functionality
   - Spam detection and filtering
   - Lead verification system
   - Customizable spam criteria
   - Manual review interface

## Lead Processing and Spam Detection

### Spam Detection System
1. **ChatGPT Integration**
   - Analyze lead information using ChatGPT
   - Identify common spam patterns
   - Detect suspicious contact information
   - Recognize automated/bot behavior
   - Flag inappropriate content

2. **Two-Step Verification**
   - Initial ChatGPT analysis
   - Secondary verification for borderline cases
   - Manual review option
   - Business-specific criteria application

3. **Spam Pattern Recognition**
   - Irrelevant inquiries
   - Suspicious contact details
   - Automated behavior patterns
   - Malicious content
   - Inappropriate language

4. **Feedback System**
   - Store spam detection results
   - Track false positives/negatives
   - Improve detection accuracy
   - Business feedback integration
   - Pattern learning system

5. **Customization Options**
   - Business-specific criteria
   - Custom spam patterns
   - Notification preferences
   - Review thresholds
   - Automated actions

### Lead Processing Flow
1. **Initial Capture**
   - Collect lead information
   - Record call details
   - Store raw data

2. **Spam Analysis**
   - Process with ChatGPT
   - Apply business criteria
   - Check against known patterns
   - Generate confidence score

3. **Verification**
   - Automatic for high-confidence leads
   - Manual review for borderline cases
   - Business-specific rules application
   - Final decision recording

4. **Notification**
   - Forward legitimate leads only
   - Custom notification formats
   - Priority-based delivery
   - Delivery confirmation

5. **Storage and Analytics**
   - Store processed leads
   - Track spam patterns
   - Generate insights
   - Update detection models

## Prerequisites
- Node.js (v18 or higher)
- pnpm package manager
- Git
- Firebase account
- Twilio account
- OpenAI API key
- Vapi/Retell account

## Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your credentials to `.env.local`:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-firebase-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-firebase-app-id
   TWILIO_ACCOUNT_SID=your-twilio-sid
   TWILIO_AUTH_TOKEN=your-twilio-token
   OPENAI_API_KEY=your-openai-key
   VAPI_API_KEY=your-vapi-key
   ```
4. Start the development server:
   ```bash
   pnpm dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure
```
├── app/                  # Next.js app directory
├── components/          # Reusable React components
│   ├── business/       # Business management components
│   ├── calls/          # Call handling components
│   ├── leads/          # Lead management components
│   └── numbers/        # Phone number management components
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
│   ├── firebase/      # Firebase client and utilities
│   ├── twilio/        # Twilio integration
│   ├── openai/        # OpenAI integration
│   └── vapi/          # Vapi/Retell integration
├── styles/             # SCSS styles
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## Firebase Structure
```typescript
// Collections
interface FirebaseCollections {
  businesses: {
    [businessId: string]: {
      name: string
      ownerId: string
      createdAt: Timestamp
      businessHours: {
        [day: string]: {
          open: string
          close: string
        }
      }
      notificationPreferences: {
        email: boolean
        sms: boolean
      }
    }
  }
  
  phoneNumbers: {
    [numberId: string]: {
      businessId: string
      twilioNumber: string
      status: 'active' | 'inactive'
      createdAt: Timestamp
    }
  }
  
  leads: {
    [leadId: string]: {
      businessId: string
      phoneNumber: string
      name?: string
      email?: string
      notes?: string
      createdAt: Timestamp
    }
  }
  
  calls: {
    [callId: string]: {
      businessId: string
      phoneNumberId: string
      leadId?: string
      duration: number
      recordingUrl?: string
      transcription?: string
      isSpam: boolean
      createdAt: Timestamp
    }
  }
}
```

## Development Guidelines

### Code Style
- Use functional components with TypeScript
- Follow the "function" keyword pattern for components
- Use interfaces over types for object definitions
- Implement proper error handling and edge cases
- Use early returns and guard clauses
- Avoid unnecessary else statements

### Component Structure
```typescript
// components/business/business-profile.tsx
interface BusinessProfileProps {
  businessId: string
  onUpdate: (data: BusinessData) => void
}

export function BusinessProfile({ businessId, onUpdate }: BusinessProfileProps) {
  if (!businessId) return null
  
  return (
    <div>
      <h1>Business Profile</h1>
      {/* Business profile form */}
    </div>
  )
}
```

### Styling Guidelines
- Use SCSS for complex styling
- Follow mobile-first approach
- Use Tailwind CSS for utility classes
- Implement responsive design using SCSS mixins
- Use CSS variables for theming

### Integration Guidelines
1. **Firebase Integration**
   - Set up Firestore collections
   - Configure Firebase Authentication
   - Set up Cloud Functions for webhooks
   - Configure Firebase Storage for recordings
   - Implement real-time listeners for call status

2. **Twilio Integration**
   - Implement webhook handlers for call events
   - Set up number purchasing flow
   - Handle call forwarding logic
   - Implement call recording storage

3. **OpenAI Integration**
   - Implement spam detection
   - Process call transcriptions
   - Generate call summaries

4. **Vapi/Retell Integration**
   - Set up AI agent configurations
   - Handle real-time call processing
   - Manage agent responses

### Error Handling
- Implement error boundaries
- Use proper error logging
- Provide user-friendly error messages
- Handle edge cases gracefully
- Implement retry mechanisms for API calls

### Performance Optimization
- Implement code splitting
- Use dynamic imports for large components
- Optimize images and assets
- Implement proper caching strategies
- Use Firebase's built-in caching mechanisms
- Optimize call handling latency

### Testing
- Write unit tests for components
- Implement integration tests
- Use proper testing utilities
- Follow testing best practices
- Test call handling scenarios
- Test AI agent responses

## Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build production version
- `pnpm start` - Start production server
- `pnpm lint` - Run linting
- `pnpm test` - Run tests

## Best Practices
1. **Component Organization**
   - Keep components small and focused
   - Use proper naming conventions
   - Implement proper prop types
   - Use composition over inheritance

2. **Integration Management**
   - Implement proper error handling
   - Use retry mechanisms
   - Implement proper logging
   - Handle API rate limits
   - Implement proper fallbacks

3. **Performance**
   - Optimize call handling latency
   - Implement proper caching
   - Use proper loading states
   - Optimize API calls
   - Handle concurrent calls

4. **Security**
   - Implement proper authentication
   - Use Firebase Security Rules
   - Secure API keys
   - Implement proper data validation
   - Follow security best practices

5. **Call Handling**
   - Implement proper call routing
   - Handle call failures gracefully
   - Implement proper fallbacks
   - Monitor call quality
   - Track call metrics

## Deployment
1. Set up your Firebase project
2. Configure Twilio webhooks
3. Set up Vapi/Retell integration
4. Configure environment variables
5. Build the project:
   ```bash
   pnpm build
   ```
6. Start the production server:
   ```bash
   pnpm start
   ```

## Troubleshooting
- Clear node_modules and reinstall dependencies
- Check for proper environment variables
- Verify proper TypeScript configurations
- Check for proper Next.js configurations
- Verify Firebase connection and permissions
- Check Twilio webhook configurations
- Verify AI agent settings

## Contributing
1. Create a new branch
2. Make your changes
3. Submit a pull request
4. Follow code review guidelines

## Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Shadcn UI Documentation](https://ui.shadcn.com)
- [Radix UI Documentation](https://www.radix-ui.com)
- [Firebase Documentation](https://firebase.google.com/docs)
- [Twilio Documentation](https://www.twilio.com/docs)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Vapi Documentation](https://docs.vapi.ai)
- [React Query Documentation](https://tanstack.com/query/latest)

## Current Status
- Phase: 2 - Database and Authentication
- Progress: 15%
- Last Updated: [Current Date]
- Current Task: Create Firestore collections
- Next Steps:
  1. Create Businesses collection
  2. Create Phone Numbers collection
  3. Create Leads collection
  4. Create Calls collection

## Next Steps
1. Initialize Next.js project
2. Set up basic infrastructure
3. Begin Firebase setup

## Notes
- Each phase should be completed and tested before moving to the next
- Regular backups should be maintained throughout development
- Security reviews should be conducted at each phase
- Documentation should be updated as features are completed 

## Development Standards and Best Practices

### Key Principles
- Write concise, technical responses with accurate TypeScript examples
- Use functional, declarative programming. Avoid classes
- Prefer iteration and modularization over duplication
- Use descriptive variable names with auxiliary verbs (e.g., isLoading)
- Use lowercase with dashes for directories (e.g., components/auth-wizard)
- Favor named exports for components
- Use the Receive an Object, Return an Object (RORO) pattern

### JavaScript/TypeScript Standards
- Use "function" keyword for pure functions. Omit semicolons
- Use TypeScript for all code. Prefer interfaces over types. Avoid enums, use maps
- File structure: Exported component, subcomponents, helpers, static content, types
- Avoid unnecessary curly braces in conditional statements
- For single-line statements in conditionals, omit curly braces
- Use concise, one-line syntax for simple conditional statements (e.g., if (condition) doSomething())

### Error Handling
- Handle errors and edge cases at the beginning of functions
- Use early returns for error conditions to avoid deeply nested if statements
- Place the happy path last in the function for improved readability
- Avoid unnecessary else statements; use if-return pattern instead
- Use guard clauses to handle preconditions and invalid states early
- Implement proper error logging and user-friendly error messages
- Consider using custom error types or error factories for consistent error handling

### Next.js Best Practices
- Use the App Router for modern Next.js applications
- Implement server components where appropriate for better performance
- Use client components only when necessary (interactivity, browser APIs)
- Leverage Next.js data fetching methods (getServerSideProps, getStaticProps)
- Implement proper loading states with loading.tsx files
- Use error boundaries with error.tsx and global-error.tsx
- Follow Next.js best practices for routing and navigation
- Utilize Next.js Image component for optimized images
- Implement proper metadata for SEO

### React Best Practices
- Use functional components and TypeScript interfaces
- Use declarative JSX
- Use function, not const, for components
- Use Shadcn UI, Radix
- Implement responsive design
- Use mobile-first approach for responsive design using scss
- Use dynamic loading for non-critical components
- Use error boundaries for unexpected errors

### Tailwind CSS Guidelines
- Use Tailwind CSS utility classes for styling
- Follow mobile-first responsive design principles
- Use Tailwind's dark mode for theme switching
- Leverage Tailwind's configuration for custom theming
- Use @apply directive for reusable component styles
- Implement responsive design using Tailwind's breakpoint utilities
- Use Tailwind's state variants (hover, focus, active) for interactive elements

### Integration Guidelines

#### Firebase Integration
- Use Firebase Authentication for user management
- Implement Firestore for database operations with proper security rules
- Utilize Firebase Storage for file uploads and media storage
- Leverage Firebase Cloud Functions for serverless backend operations
- Follow Firebase best practices for data modeling and security
- Implement proper error handling for Firebase operations
- Use Firebase SDK v9+ with modular imports for better tree-shaking
- Consider using Firebase Emulators for local development and testing

#### Twilio Integration
- Follow the [Twilio documentation](https://www.twilio.com/docs) for proper integration
- Use Twilio's SDK for voice, messaging, and video capabilities
- Implement proper error handling for Twilio API calls
- Use webhooks for handling incoming calls and messages
- Follow Twilio's best practices for:
  - Voice call handling and recording
  - SMS messaging
  - Video conferencing
  - Phone number management
  - Call forwarding and routing
- Implement proper security measures for Twilio credentials
- Use environment variables for storing Twilio API keys and tokens
- Consider using Twilio's test credentials for development

#### SendGrid Integration
- Follow the [SendGrid documentation](https://docs.sendgrid.com/) for proper integration
- Use SendGrid's API for sending transactional and marketing emails
- Implement proper error handling for SendGrid API calls
- Use SendGrid's templates for consistent email branding
- Follow SendGrid's best practices for:
  - Email deliverability optimization
  - Template design and responsive layouts
  - Email authentication (SPF, DKIM, DMARC)
  - List management and segmentation
  - Analytics and tracking
- Implement proper security measures for SendGrid API keys
- Use environment variables for storing SendGrid API keys
- Consider using SendGrid's sandbox mode for testing
- Implement rate limiting to avoid hitting API limits

#### Retell AI Integration
- Follow the [Retell AI documentation](https://docs.retellai.com/general/introduction) for proper integration
- Implement the Retell AI SDK for voice agent capabilities
- Use the Retell AI platform for building, testing, deploying, and monitoring AI phone agents
- Leverage Retell's features for:
  - Building sophisticated voice AI agents
  - Testing agents in the playground
  - Deploying to dedicated phone numbers
  - Integrating with existing phone systems via SIP Trunking
  - Scaling deployments with additional concurrency
- Ensure proper error handling for Retell AI API calls and voice interactions
- Implement webhooks for monitoring calls and post-call analysis
- Follow Retell's best practices for prompt engineering and conversation flow design 

## Task Management and Verification Process

### Task Completion Checklist
For each completed task:
- [ ] Mark task as completed in implementation plan
- [ ] Verify against development standards
- [ ] Update current status
- [ ] Document new learnings
- [ ] Update relevant documentation

### Verification Steps
1. **Code Review**
   - Check against TypeScript standards
   - Verify React best practices
   - Confirm error handling implementation
   - Review component structure

2. **Integration Verification**
   - Verify Firebase implementation
   - Check Twilio integration
   - Confirm SendGrid setup
   - Validate Retell AI configuration

3. **Documentation Update**
   - Update implementation status
   - Add new learnings
   - Document any changes
   - Update best practices

4. **Testing Verification**
   - Confirm unit tests
   - Verify integration tests
   - Check error handling
   - Validate edge cases

### Status Tracking
Current implementation status will be updated after each task:
```markdown
## Current Status
- Phase: [Current Phase]
- Progress: [X]%
- Last Updated: [Date]
- Current Task: [Task Name]
- Next Steps: [Next Tasks]
```

### Quality Assurance
Each completed task must meet:
1. Code quality standards
2. Performance requirements
3. Security guidelines
4. Documentation standards
5. Testing coverage 