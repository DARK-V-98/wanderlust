'use server';

/**
 * @fileOverview Generates a concise and compelling summary for a travel destination.
 *
 * - generateDestinationSummary - A function that generates the destination summary.
 * - DestinationSummaryInput - The input type for the generateDestinationSummary function.
 * - DestinationSummaryOutput - The return type for the generateDestinationSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DestinationSummaryInputSchema = z.object({
  destinationName: z.string().describe('The name of the destination.'),
  description: z.string().describe('A detailed description of the destination, including attractions, activities, and local culture.'),
  travelTips: z.string().optional().describe('Optional travel tips for the destination.'),
});
export type DestinationSummaryInput = z.infer<typeof DestinationSummaryInputSchema>;

const DestinationSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise and compelling summary of the destination, highlighting unique features and travel tips.'),
});
export type DestinationSummaryOutput = z.infer<typeof DestinationSummaryOutputSchema>;

export async function generateDestinationSummary(input: DestinationSummaryInput): Promise<DestinationSummaryOutput> {
  return destinationSummaryFlow(input);
}

const destinationSummaryPrompt = ai.definePrompt({
  name: 'destinationSummaryPrompt',
  input: {schema: DestinationSummaryInputSchema},
  output: {schema: DestinationSummaryOutputSchema},
  prompt: `You are an expert travel writer. Generate a concise and compelling summary of the following destination, highlighting its unique features and travel tips.

Destination Name: {{{destinationName}}}
Description: {{{description}}}

{{#if travelTips}}
Travel Tips: {{{travelTips}}}
{{/if}}

Summary:`,
});

const destinationSummaryFlow = ai.defineFlow(
  {
    name: 'destinationSummaryFlow',
    inputSchema: DestinationSummaryInputSchema,
    outputSchema: DestinationSummaryOutputSchema,
  },
  async input => {
    const {output} = await destinationSummaryPrompt(input);
    return output!;
  }
);
