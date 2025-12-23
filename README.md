# web-template (TypeScript)

Quick TypeScript setup for this repository.

Commands:

- Install deps:

```bash
npm install
```

- Development (auto-restart):

```bash
npm run dev
```

- Build:

```bash
npm run build
```

- Run built app:

```bash
npm start
```

## Request Validation with Zod

This project uses [Zod](https://zod.dev/) for request validation, providing
strong type safety and improved error handling.

### How It Works

1. **Validation Schemas**: Defined in `src/models/user.schema.ts` using Zod
2. **Validation Middleware**: Located in `src/utils/validate.ts`
3. **Route Integration**: Applied in `src/routes/user.routes.ts`

### Example Usage

#### Creating a User (POST /api/users)

Valid request:

```json
{
  "name": "John",
  "surname": "Doe",
  "email": "john.doe@example.com",
  "age": 25
}
```

Invalid request (missing required fields):

```json
{
  "name": "John"
}
```

Error response:

```json
{
  "message": "Validation failed",
  "errors": [
    { "field": "surname", "message": "Surname is required" },
    {
      "field": "email",
      "message": "Invalid input: expected string, received undefined"
    }
  ]
}
```

### Adding New Validation Schemas

1. Define your schema in the appropriate model file:

```typescript
import { z } from 'zod';

export const mySchema = z.object({
  field: z.string().min(1),
  // ... other fields
});
```

2. Apply the validation middleware to your routes:

```typescript
import { validate } from '../utils/validate';
import { mySchema } from '../models/my.schema';

router.post('/endpoint', validate(mySchema, 'body'), controller);
```

### Benefits

- **Type Safety**: Automatic TypeScript type inference from schemas
- **Consistent Error Handling**: Standardized validation error responses
- **Better DX**: Clear error messages help developers understand validation
  issues
- **Runtime Safety**: Ensures data structure at runtime matches TypeScript types
