export interface Challenge {
  id: string;
  argument: string;
  correctFallacies: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  fallacyOptions: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

export const challengeBank: Challenge[] = [
  {
    id: "climate-parking",
    argument: "Sarah says we shouldn't listen to Dr. Johnson's research on climate change because he once got a parking ticket. Clearly, if he can't follow simple traffic laws, how can we trust his scientific conclusions about something as complex as global warming?",
    correctFallacies: ["ad-hominem", "false-cause"],
    difficulty: "beginner",
    fallacyOptions: [
      { id: "ad-hominem", name: "Ad Hominem", description: "Attacking the person rather than their argument" },
      { id: "strawman", name: "Strawman", description: "Misrepresenting someone's argument to make it easier to attack" },
      { id: "false-cause", name: "False Cause", description: "Assuming correlation implies causation" },
      { id: "slippery-slope", name: "Slippery Slope", description: "Claiming one event will lead to extreme consequences" },
      { id: "appeal-authority", name: "Appeal to Authority", description: "Using authority as evidence when the authority is not relevant" },
      { id: "bandwagon", name: "Bandwagon", description: "Arguing something is true because many people believe it" }
    ]
  },
  {
    id: "video-games-violence",
    argument: "Ever since video games became popular, school violence has increased. My neighbor's son plays violent video games for hours, and last week he got into a fight at school. This proves that video games are making our children violent and should be banned immediately.",
    correctFallacies: ["false-cause", "hasty-generalization"],
    difficulty: "intermediate",
    fallacyOptions: [
      { id: "false-cause", name: "False Cause", description: "Assuming correlation implies causation" },
      { id: "hasty-generalization", name: "Hasty Generalization", description: "Making broad conclusions from limited examples" },
      { id: "ad-hominem", name: "Ad Hominem", description: "Attacking the person rather than their argument" },
      { id: "strawman", name: "Strawman", description: "Misrepresenting someone's argument to make it easier to attack" },
      { id: "slippery-slope", name: "Slippery Slope", description: "Claiming one event will lead to extreme consequences" },
      { id: "appeal-emotion", name: "Appeal to Emotion", description: "Using emotions instead of logic to persuade" }
    ]
  },
  {
    id: "organic-food",
    argument: "Everyone I know is buying organic food these days, so it must be healthier than regular food. My yoga instructor says chemicals in regular food are poisoning us, and she's really into wellness. Plus, if organic wasn't better, why would it cost more?",
    correctFallacies: ["bandwagon", "appeal-authority", "false-cause"],
    difficulty: "intermediate",
    fallacyOptions: [
      { id: "bandwagon", name: "Bandwagon", description: "Arguing something is true because many people believe it" },
      { id: "appeal-authority", name: "Appeal to Authority", description: "Using authority as evidence when the authority is not relevant" },
      { id: "false-cause", name: "False Cause", description: "Assuming correlation implies causation" },
      { id: "ad-hominem", name: "Ad Hominem", description: "Attacking the person rather than their argument" },
      { id: "circular-reasoning", name: "Circular Reasoning", description: "Using the conclusion as evidence for itself" },
      { id: "red-herring", name: "Red Herring", description: "Introducing irrelevant information to distract" }
    ]
  },
  {
    id: "homework-grades",
    argument: "If we reduce homework by even 10 minutes per night, students will become lazy. Once they get used to less work, they'll demand even shorter assignments. Before you know it, they won't want to do any homework at all, and their grades will plummet. Our entire education system will collapse!",
    correctFallacies: ["slippery-slope"],
    difficulty: "beginner",
    fallacyOptions: [
      { id: "slippery-slope", name: "Slippery Slope", description: "Claiming one event will lead to extreme consequences" },
      { id: "strawman", name: "Strawman", description: "Misrepresenting someone's argument to make it easier to attack" },
      { id: "false-dilemma", name: "False Dilemma", description: "Presenting only two options when more exist" },
      { id: "appeal-emotion", name: "Appeal to Emotion", description: "Using emotions instead of logic to persuade" },
      { id: "hasty-generalization", name: "Hasty Generalization", description: "Making broad conclusions from limited examples" },
      { id: "bandwagon", name: "Bandwagon", description: "Arguing something is true because many people believe it" }
    ]
  },
  {
    id: "celebrity-politician",
    argument: "That famous actor shouldn't run for mayor. Sure, he talks about fixing the city's budget problems, but what does someone who just pretends to be other people for a living know about real economics? He's probably just doing this for publicity anyway.",
    correctFallacies: ["ad-hominem", "strawman"],
    difficulty: "intermediate",
    fallacyOptions: [
      { id: "ad-hominem", name: "Ad Hominem", description: "Attacking the person rather than their argument" },
      { id: "strawman", name: "Strawman", description: "Misrepresenting someone's argument to make it easier to attack" },
      { id: "appeal-authority", name: "Appeal to Authority", description: "Using authority as evidence when the authority is not relevant" },
      { id: "false-cause", name: "False Cause", description: "Assuming correlation implies causation" },
      { id: "circular-reasoning", name: "Circular Reasoning", description: "Using the conclusion as evidence for itself" },
      { id: "red-herring", name: "Red Herring", description: "Introducing irrelevant information to distract" }
    ]
  },
  {
    id: "social-media-ban",
    argument: "Either we ban all social media for teenagers, or we accept that they'll become completely addicted and fail in life. There's no middle ground here. Look at the studies showing increased anxiety among teens - clearly social media is the only cause.",
    correctFallacies: ["false-dilemma", "false-cause"],
    difficulty: "advanced",
    fallacyOptions: [
      { id: "false-dilemma", name: "False Dilemma", description: "Presenting only two options when more exist" },
      { id: "false-cause", name: "False Cause", description: "Assuming correlation implies causation" },
      { id: "slippery-slope", name: "Slippery Slope", description: "Claiming one event will lead to extreme consequences" },
      { id: "hasty-generalization", name: "Hasty Generalization", description: "Making broad conclusions from limited examples" },
      { id: "appeal-emotion", name: "Appeal to Emotion", description: "Using emotions instead of logic to persuade" },
      { id: "strawman", name: "Strawman", description: "Misrepresenting someone's argument to make it easier to attack" }
    ]
  },
  {
    id: "electric-cars",
    argument: "My friend bought an electric car last year and it broke down twice. Electric cars are clearly unreliable. Plus, Tesla's CEO is always posting weird stuff on social media - how can we trust a company run by someone like that?",
    correctFallacies: ["hasty-generalization", "ad-hominem"],
    difficulty: "beginner",
    fallacyOptions: [
      { id: "hasty-generalization", name: "Hasty Generalization", description: "Making broad conclusions from limited examples" },
      { id: "ad-hominem", name: "Ad Hominem", description: "Attacking the person rather than their argument" },
      { id: "strawman", name: "Strawman", description: "Misrepresenting someone's argument to make it easier to attack" },
      { id: "false-cause", name: "False Cause", description: "Assuming correlation implies causation" },
      { id: "appeal-authority", name: "Appeal to Authority", description: "Using authority as evidence when the authority is not relevant" },
      { id: "bandwagon", name: "Bandwagon", description: "Arguing something is true because many people believe it" }
    ]
  },
  {
    id: "vaccine-debate",
    argument: "Dr. Smith, who has been studying vaccines for 20 years, says they're safe and effective. But Dr. Jones, who writes popular health blogs, says vaccines are dangerous. Since both are doctors, we can't really know who's right. I guess we should just avoid vaccines to be safe.",
    correctFallacies: ["false-equivalence", "appeal-authority"],
    difficulty: "advanced",
    fallacyOptions: [
      { id: "false-equivalence", name: "False Equivalence", description: "Treating unequal things as if they were equal" },
      { id: "appeal-authority", name: "Appeal to Authority", description: "Using authority as evidence when the authority is not relevant" },
      { id: "ad-hominem", name: "Ad Hominem", description: "Attacking the person rather than their argument" },
      { id: "false-dilemma", name: "False Dilemma", description: "Presenting only two options when more exist" },
      { id: "circular-reasoning", name: "Circular Reasoning", description: "Using the conclusion as evidence for itself" },
      { id: "red-herring", name: "Red Herring", description: "Introducing irrelevant information to distract" }
    ]
  },
  {
    id: "student-protest",
    argument: "These student protesters want to change the dress code, but that's just the first step. Next they'll demand to choose their own teachers, then they'll want to set their own curriculum. Eventually, students will be running the entire school and chaos will ensue!",
    correctFallacies: ["slippery-slope"],
    difficulty: "beginner",
    fallacyOptions: [
      { id: "slippery-slope", name: "Slippery Slope", description: "Claiming one event will lead to extreme consequences" },
      { id: "strawman", name: "Strawman", description: "Misrepresenting someone's argument to make it easier to attack" },
      { id: "hasty-generalization", name: "Hasty Generalization", description: "Making broad conclusions from limited examples" },
      { id: "appeal-emotion", name: "Appeal to Emotion", description: "Using emotions instead of logic to persuade" },
      { id: "false-dilemma", name: "False Dilemma", description: "Presenting only two options when more exist" },
      { id: "ad-hominem", name: "Ad Hominem", description: "Attacking the person rather than their argument" }
    ]
  },
  {
    id: "remote-work",
    argument: "Companies that allow remote work are just being trendy. All the successful companies I've heard of have beautiful office buildings. My manager says remote workers are less productive, and he's been in business for 15 years, so he should know.",
    correctFallacies: ["appeal-authority", "false-cause", "hasty-generalization"],
    difficulty: "intermediate",
    fallacyOptions: [
      { id: "appeal-authority", name: "Appeal to Authority", description: "Using authority as evidence when the authority is not relevant" },
      { id: "false-cause", name: "False Cause", description: "Assuming correlation implies causation" },
      { id: "hasty-generalization", name: "Hasty Generalization", description: "Making broad conclusions from limited examples" },
      { id: "bandwagon", name: "Bandwagon", description: "Arguing something is true because many people believe it" },
      { id: "strawman", name: "Strawman", description: "Misrepresenting someone's argument to make it easier to attack" },
      { id: "ad-hominem", name: "Ad Hominem", description: "Attacking the person rather than their argument" }
    ]
  }
];

export const getRandomChallenge = (): Challenge => {
  const randomIndex = Math.floor(Math.random() * challengeBank.length);
  return challengeBank[randomIndex];
};

export const getDailyChallengeByDate = (date: Date = new Date()): Challenge => {
  // Create a seed based on the date (YYYY-MM-DD format)
  const dateString = date.toISOString().split('T')[0];
  let seed = 0;
  for (let i = 0; i < dateString.length; i++) {
    seed = (seed * 31 + dateString.charCodeAt(i)) % challengeBank.length;
  }
  return challengeBank[Math.abs(seed)];
};

export const getChallengeDifficulties = () => {
  return ['beginner', 'intermediate', 'advanced'] as const;
};