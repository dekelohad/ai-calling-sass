# AI Calling SASS Project Instructions

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
- Supabase (Database & Authentication)
- Twilio (Phone Numbers & Call Handling)
- OpenAI (Spam Classification)
- Vapi/Retell (Voice AI Agents)
- pnpm (package manager)

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

## Prerequisites
- Node.js (v18 or higher)
- pnpm package manager
- Git
- Supabase account
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
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
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
│   ├── supabase/      # Supabase client and utilities
│   ├── twilio/        # Twilio integration
│   ├── openai/        # OpenAI integration
│   └── vapi/          # Vapi/Retell integration
├── styles/             # SCSS styles
├── public/             # Static assets
└── types/              # TypeScript type definitions
```

## Database Schema
```sql
-- Businesses table
create table businesses (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  owner_id uuid references auth.users(id),
  created_at timestamp with time zone default timezone('utc'::text, now()),
  business_hours jsonb,
  notification_preferences jsonb
);

-- Phone numbers table
create table phone_numbers (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id),
  twilio_number text not null,
  status text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Leads table
create table leads (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id),
  phone_number text not null,
  name text,
  email text,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Calls table
create table calls (
  id uuid primary key default uuid_generate_v4(),
  business_id uuid references businesses(id),
  phone_number_id uuid references phone_numbers(id),
  lead_id uuid references leads(id),
  duration integer,
  recording_url text,
  transcription text,
  is_spam boolean,
  created_at timestamp with time zone default timezone('utc'::text, now())
);
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
1. **Twilio Integration**
   - Implement webhook handlers for call events
   - Set up number purchasing flow
   - Handle call forwarding logic
   - Implement call recording storage

2. **OpenAI Integration**
   - Implement spam detection
   - Process call transcriptions
   - Generate call summaries

3. **Vapi/Retell Integration**
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
- Use Supabase's built-in caching mechanisms
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
   - Use Row Level Security (RLS)
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
1. Set up your Supabase project
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
- Verify Supabase connection and permissions
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
- [Supabase Documentation](https://supabase.com/docs)
- [Twilio Documentation](https://www.twilio.com/docs)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Vapi Documentation](https://docs.vapi.ai)
- [React Query Documentation](https://tanstack.com/query/latest) 