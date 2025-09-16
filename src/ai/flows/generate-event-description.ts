'use server';

/**
 * @fileOverview AI-powered tool for generating event descriptions.
 *
 * - generateEventDescription - A function that generates event descriptions based on user input.
 * - GenerateEventDescriptionInput - The input type for the generateEventDescription function.
 * - GenerateEventDescriptionOutput - The return type for the generateEventDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateEventDescriptionInputSchema = z.object({
  eventName: z.string().describe('The name of the event.'),
  eventDate: z.string().describe('The date of the event.'),
  eventTime: z.string().describe('The time of the event.'),
  eventLocation: z.string().describe('The location of the event.'),
  eventDescriptionContext: z
    .string()
    .describe(
      'Any additional information or context about the event that might be useful in generating a description.'
    ),
});

export type GenerateEventDescriptionInput = z.infer<
  typeof GenerateEventDescriptionInputSchema
>;

const GenerateEventDescriptionOutputSchema = z.object({
  eventDescription: z
    .string()
    .describe('The generated event description, including date, time and location.'),
});

export type GenerateEventDescriptionOutput = z.infer<
  typeof GenerateEventDescriptionOutputSchema
>;

export async function generateEventDescription(
  input: GenerateEventDescriptionInput
): Promise<GenerateEventDescriptionOutput> {
  return generateEventDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateEventDescriptionPrompt',
  input: {schema: GenerateEventDescriptionInputSchema},
  output: {schema: GenerateEventDescriptionOutputSchema},
  prompt: `You are an event description generator. Use the provided information to create an engaging description for the event.

Event Name: {{{eventName}}}
Date: {{{eventDate}}}
Time: {{{eventTime}}}
Location: {{{eventLocation}}}
Context: {{{eventDescriptionContext}}}

Write a description that is concise, informative, and enticing to potential attendees. Include the date, time and location.`,
});

const generateEventDescriptionFlow = ai.defineFlow(
  {
    name: 'generateEventDescriptionFlow',
    inputSchema: GenerateEventDescriptionInputSchema,
    outputSchema: GenerateEventDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
