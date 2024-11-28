import { z } from "zod";

const MembershipSchema = z.object({
  MembershipID: z.number(),
  MembershipName: z.string(),
  PricePerMonth: z.string(),
  AccessLevel: z.string(),
  Duration: z.string(),
  MaxClassBookings: z.number(),
  Description: z.string(),
});

// TypeScript type inferred from the schema
export type Membership = z.infer<typeof MembershipSchema>;
