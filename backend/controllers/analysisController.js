// @desc    Analyze symptoms
// @route   POST /api/analysis/symptoms
exports.analyzeSymptoms = (req, res) => {
  const { symptoms } = req.body;
  // Mock AI response
  console.log('Analyzing symptoms:', symptoms);
  res.json({
    suggestions: [
      { condition: "Common Cold", probability: "45%" },
      { condition: "Allergic Rhinitis", probability: "25%" },
    ],
    advice: "This is not a medical diagnosis. Please see a doctor for an accurate assessment."
  });
};

// @desc    Predict disease
// @route   POST /api/analysis/predict
exports.predictDisease = (req, res) => {
  const { age, gender, features } = req.body;
  // Mock ML model response
  console.log('Predicting for:', { age, gender, features });
  res.json({
      result: "Low Risk of Cardiac Event",
      confidence: "82%",
      details: "Based on the provided mock data, the predictive model indicates a low probability."
  });
};

// @desc    Analyze an uploaded report
// @route   POST /api/analysis/report
exports.analyzeReport = (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file.' });
    }
// In a real app, this file would be passed to a Python script or AI service.
// For now, we'll return a mock analysis based on the successful upload.
    console.log('File uploaded:', req.file.filename);
    res.json({
        summary: `Analysis complete for ${req.file.originalname}. Report indicates normal ranges for CBC. Slight elevation in CRP.`,
        recommendations: ["Consult physician for inflammation cause", "Follow-up in 2 weeks"]
    });
};

// @desc    Get food recommendations based on a health goal
// @route   POST /api/analysis/food
exports.getFoodRecommendations = (req, res) => {
    const { goal } = req.body;

    const mockDB = {
        general: ["A variety of colorful fruits and vegetables", "Whole grains like oats and quinoa", "Lean protein sources (chicken, fish)", "Healthy fats from avocados and nuts"],
        diabetic: ["Low-glycemic index foods (berries, non-starchy vegetables)", "Leafy greens like spinach and kale", "Lean protein to manage blood sugar", "Fiber-rich foods like beans and lentils"],
        cardio: ["Omega-3 rich fish (salmon, mackerel)", "Nuts, especially walnuts and almonds", "Oats and barley to help lower cholesterol", "Berries for their antioxidant properties"]
    };

    const recommendations = mockDB[goal] || ["Ensure a balanced diet.", "Stay hydrated.", "Consult a nutritionist for a personalized plan."];

    res.json({ recommendations });
};