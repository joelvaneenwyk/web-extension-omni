document.addEventListener('DOMContentLoaded',async () => {
	const options = await getOptions();
	initialize(options);

	document
		.getElementById("language-select")
		.addEventListener("change", async (event) => {
			const selectedOption = event.target.value;
			const updatedOptions = {
				...(await getOptions()),
				language: selectedOption,
			};
			setOptions(updatedOptions);
		});

	document
		.getElementById("theme-select")
		.addEventListener("change", async (event) => {
			const selectedOption = event.target.value;
			const updatedOptions = { ...(await getOptions()), theme: selectedOption };
			setOptions(updatedOptions);
		});
});

const getOptions = async () => await chrome.storage.sync.get();

const setOptions = (options) => chrome.storage.sync.set(options);

const initialize = (options) => {
	const languageSelect = document.getElementById("language-select");
	const themeSelect = document.getElementById("theme-select");

	languageSelect.value = options.language ?? "sys";
	themeSelect.value = options.theme ?? "sys";
};
