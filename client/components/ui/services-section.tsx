import React from 'react'
import { GlowingStarsBackgroundCardPreview } from '@/components/ui/glowing-stars-card'

const ServiceCardSection = () => {
  return (
    <div className="flex flex-row mb-56">
       <GlowingStarsBackgroundCardPreview heading="Crop Yield Prediction & Analyzing System" content="Forecasts crop yields based on soil quality, 
       crop type, planting date, and other factors. Allows farmers to manage yield records, search by criteria, 
       and generate summary reports for better decision-making." hrefLink='/yield/prediction'/>
       <GlowingStarsBackgroundCardPreview heading="Weather and Environmental Data Integration" content="Provides current weather data for rice 
       farming, including rainfall, temperature, and humidity. Allows farmers to search data, 
       receive updates, and generate reports to adjust practices for better outcomes." hrefLink='/weather/report'/>
       <GlowingStarsBackgroundCardPreview heading="Pest Identification and Symptom Checker" content="Identifies pests based on user-input symptoms 
       using a comprehensive database. Users can manage pest records, search by symptoms or pest names, 
       and generate reports with summaries, symptoms, and treatments for effective pest management." hrefLink='/desease/detection'/>
    </div>
  )
}

export default ServiceCardSection