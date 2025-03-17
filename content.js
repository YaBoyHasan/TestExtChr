// Function to replace the random number generated on Google's RNG page
function manipulateRNG() {
    // Specify the number you want to display
    const desiredNumber = 123456; // Change this to any number you want
    const numberElement = document.querySelector('div.gws-csf-randomnumber__result');
    const generateButton = document.querySelector('div[jsname="wl2F8e"]');
    const minInput = document.querySelector('input.gws-csf-randomnumber__minVal');
    const maxInput = document.querySelector('input.gws-csf-randomnumber__maxVal'); // Assuming there is a max input

    // Boolean to control rigging only once
    let hasRigged = false;

    // Function to animate the number change
    function animateNumberChange(targetNumber) {
        const targetDigits = targetNumber.toString().split('');
        const currentNumber = parseInt(numberElement.innerText);
        const currentDigits = currentNumber.toString().split('');
        
        const duration = 2000; // Total duration for the animation
        const steps = 60; // Number of animation steps
        const stepDuration = duration / steps; // Time per step

        const digitCycles = targetDigits.map((targetDigit, index) => {
            let currentDigit = parseInt(currentDigits[index]);

            return new Promise((resolve) => {
                const interval = setInterval(() => {
                    if (currentDigit === parseInt(targetDigit)) {
                        clearInterval(interval);
                        resolve();
                        return;
                    }

                    // Animate cycling to the target digit
                    if (currentDigit < parseInt(targetDigit)) {
                        currentDigit = (currentDigit + 1) % 10; // Cycle up
                    } else {
                        currentDigit = (currentDigit - 1 + 10) % 10; // Cycle down
                    }
                    
                    // Update the number displayed
                    numberElement.innerText = currentDigits.map((d, i) => (i === index ? currentDigit : d)).join('');
                }, stepDuration);
            });
        });

        // Ensure the final number is set after all animations complete
        Promise.all(digitCycles).then(() => {
            numberElement.innerText = targetNumber; // Final display of target number
        });
    }

    // Override the button click event
    if (numberElement && generateButton) {
        generateButton.addEventListener('click', function (event) {
            // Check if min and max values match the criteria (e.g., 1 and 100000)
            const minValue = parseInt(minInput.value);
            const maxValue = parseInt(maxInput.value);

            if (minValue === 1 && maxValue === 100000 && !hasRigged) {
                event.preventDefault(); // Prevent the default behavior (number generation)
                event.stopPropagation(); // Stop the event from bubbling up
                animateNumberChange(desiredNumber); // Animate to the desired number
                hasRigged = true; // Mark rigging as done
            } else if (hasRigged) {
                // Reset rigging and allow default behavior
                console.log("Rigging already completed, proceeding with normal behavior.");
                hasRigged = false;
            } else {
                console.log("Minimum and maximum values must match the criteria to rig the RNG.");
            }
        });
    }
}

// Wait for the page to fully load
window.addEventListener('load', manipulateRNG);
