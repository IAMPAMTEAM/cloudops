export default function SetFrequentOptions(optionsData) {
  const options = Object.keys(optionsData).map((key) => ({
    label: key,
    options: optionsData[key].map((option: string) => ({ value: option, label: option })),
  }));

  return options;
}
