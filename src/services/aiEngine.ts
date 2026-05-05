export type SkinType = 'Oily' | 'Dry' | 'Combination' | 'Normal' | 'Sensitive';
export type SkinConcern = 'Acne' | 'Dark Spots' | 'Wrinkles' | 'Redness' | 'Dullness' | 'Large Pores';

export interface RoutineStep {
  step: string;
  product: string;
  description: string;
}

export interface Ingredient {
  name: string;
  description: string;
}

export interface RoutineResult {
  morning: RoutineStep[];
  night: RoutineStep[];
  ingredients: Ingredient[];
}

export const generateRoutine = async (skinType: SkinType, concerns: SkinConcern[]): Promise<RoutineResult> => {
  // Simulate AI processing delay for realistic UX
  await new Promise(resolve => setTimeout(resolve, 3000));

  const morning: RoutineStep[] = [
    { step: 'Step 1: Cleanser', product: getCleanser(skinType), description: 'Gently removes impurities without stripping your skin.' },
    { step: 'Step 2: Toner', product: getToner(skinType), description: 'Balances pH and preps skin for active ingredients.' },
    { step: 'Step 3: Treatment', product: getMorningTreatment(concerns), description: 'Targets your specific concerns throughout the day.' },
    { step: 'Step 4: Moisturizer', product: getMoisturizer(skinType), description: 'Locks in hydration and protects the skin barrier.' },
    { step: 'Step 5: Sunscreen', product: 'Broad Spectrum SPF 50+', description: 'Essential protection against UV damage and premature aging.' }
  ];

  const night: RoutineStep[] = [
    { step: 'Step 1: Double Cleanse', product: 'Cleansing Balm + ' + getCleanser(skinType), description: 'Melts away SPF and makeup, followed by a deep clean.' },
    { step: 'Step 2: Toner', product: getToner(skinType), description: 'Removes any residual impurities.' },
    { step: 'Step 3: Active Treatment', product: getNightTreatment(concerns, skinType), description: 'Potent actives to repair skin overnight.' },
    { step: 'Step 4: Eye Care', product: 'Hydrating Peptide Eye Cream', description: 'Targets delicate under-eye area.' },
    { step: 'Step 5: Moisturizer', product: getMoisturizer(skinType) + ' (Thick Layer)', description: 'Seals in all treatments and deeply hydrates while you sleep.' }
  ];

  const ingredients = getRecommendedIngredients(skinType, concerns);

  return { morning, night, ingredients };
};

// Helper functions for logic
function getCleanser(skinType: SkinType): string {
  if (skinType === 'Oily' || skinType === 'Combination') return 'Salicylic Acid Foaming Cleanser';
  if (skinType === 'Dry' || skinType === 'Sensitive') return 'Gentle Hydrating Milk Cleanser';
  return 'Balancing Gel Cleanser';
}

function getToner(skinType: SkinType): string {
  if (skinType === 'Oily') return 'Niacinamide Pore-Refining Toner';
  if (skinType === 'Dry') return 'Hyaluronic Acid Hydrating Essence';
  if (skinType === 'Sensitive') return 'Centella Asiatica Soothing Toner';
  return 'Rose Water Balancing Toner';
}

function getMorningTreatment(concerns: SkinConcern[]): string {
  if (concerns.includes('Dark Spots') || concerns.includes('Dullness')) return '15% Vitamin C Serum';
  if (concerns.includes('Acne')) return '10% Azelaic Acid Suspension';
  if (concerns.includes('Redness')) return 'Mugwort Calming Ampoule';
  return 'Antioxidant Defense Serum';
}

function getNightTreatment(concerns: SkinConcern[], skinType: SkinType): string {
  if (concerns.includes('Wrinkles')) return '0.3% Retinol Serum';
  if (concerns.includes('Acne') && skinType !== 'Sensitive') return '2% BHA Liquid Exfoliant';
  if (concerns.includes('Dark Spots')) return 'Tranexamic Acid + Alpha Arbutin';
  if (concerns.includes('Large Pores')) return '10% Niacinamide + Zinc';
  return 'Barrier Repair Peptide Serum';
}

function getMoisturizer(skinType: SkinType): string {
  if (skinType === 'Oily') return 'Oil-Free Water Gel Cream';
  if (skinType === 'Dry') return 'Ceramide Rich Moisturizing Cream';
  return 'Lightweight Lotion with Squalane';
}

function getRecommendedIngredients(skinType: SkinType, concerns: SkinConcern[]): Ingredient[] {
  const ingredientsMap = new Map<string, Ingredient>();

  // Base ingredients based on skin type
  if (skinType === 'Dry') {
    ingredientsMap.set('Hyaluronic Acid', { name: 'Hyaluronic Acid', description: 'Draws moisture into the skin, keeping it plump and hydrated.' });
    ingredientsMap.set('Ceramides', { name: 'Ceramides', description: 'Essential lipids that rebuild and restore the skin barrier.' });
  } else if (skinType === 'Oily') {
    ingredientsMap.set('Salicylic Acid (BHA)', { name: 'Salicylic Acid (BHA)', description: 'Penetrates pores to dissolve oil and prevent breakouts.' });
    ingredientsMap.set('Niacinamide', { name: 'Niacinamide', description: 'Regulates sebum production and minimizes pore appearance.' });
  } else if (skinType === 'Sensitive') {
    ingredientsMap.set('Centella Asiatica', { name: 'Centella Asiatica', description: 'Intensely soothing extract that calms redness and irritation.' });
  }

  // Add concern-specific ingredients
  if (concerns.includes('Acne')) {
    ingredientsMap.set('Benzoyl Peroxide', { name: 'Benzoyl Peroxide', description: 'Kills acne-causing bacteria and reduces inflammation.' });
    ingredientsMap.set('Salicylic Acid (BHA)', { name: 'Salicylic Acid (BHA)', description: 'Exfoliates inside the pore lining to clear blockages.' });
  }
  if (concerns.includes('Dark Spots') || concerns.includes('Dullness')) {
    ingredientsMap.set('Vitamin C', { name: 'Vitamin C', description: 'Potent antioxidant that brightens skin and fades hyperpigmentation.' });
    ingredientsMap.set('Alpha Arbutin', { name: 'Alpha Arbutin', description: 'Safely and visibly brightens uneven skin tone.' });
  }
  if (concerns.includes('Wrinkles')) {
    ingredientsMap.set('Retinol', { name: 'Retinol', description: 'Accelerates cell turnover and stimulates collagen production.' });
    ingredientsMap.set('Peptides', { name: 'Peptides', description: 'Building blocks of collagen that firm and smooth the skin.' });
  }
  if (concerns.includes('Redness')) {
    ingredientsMap.set('Azelaic Acid', { name: 'Azelaic Acid', description: 'Reduces inflammation and redness associated with rosacea or acne.' });
  }

  // Ensure we have at least 3-4 ingredients
  if (ingredientsMap.size < 3) {
    ingredientsMap.set('Glycerin', { name: 'Glycerin', description: 'A powerful humectant that pulls water into the outer layer of your skin.' });
  }

  return Array.from(ingredientsMap.values()).slice(0, 4); // Return top 4
}
