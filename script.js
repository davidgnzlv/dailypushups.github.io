//CALCULATIONS START HERE

function getpushups(start, today){
    const datestart = new Date(start);
    const datetoday = new Date(today);

    const dayselapsed = Math.floor((datetoday - datestart) / (1000 * 60 * 60 * 24)) + 1
    const totalpushups = dayselapsed;

    document.getElementById("pushupCount").innerText = `Total Pushups Today: ${totalpushups}`;
}

function totalpushups(start, today) {
    const datestart = new Date(start);
    const datetoday = new Date(today);

    const dayselapsed = Math.floor((datetoday - datestart) / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include the start day
    const totalpushupsdone = (dayselapsed * (dayselapsed + 1)) / 2;

    document.getElementById("totalpushupCount").innerText = `Total Pushups Done: ${totalpushupsdone}`;
}

function totalpushupsbydate() {
    const datestart = new Date("01/01/2024");
    const datechosen = new Date(document.getElementById('datepicker').value);

    if (datechosen < new Date()) {
        document.getElementById("pushupsdonedate").innerText = "Please select a date after today.";
        return;
    }
    
    const dayselapsed = Math.floor((datechosen - datestart) / (1000 * 60 * 60 * 24)) + 1; // Adding 1 to include the start day
    const totalpushupsdone = (dayselapsed * (dayselapsed + 1)) / 2;
    
    document.getElementById("pushupsdonedate").innerText = `Pushups you will have done: ${totalpushupsdone}`;
}

function updateStatus() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB'); // DD/MM/YYYY format
    const storedDoneDate = localStorage.getItem(dateStr);
    const streak = calculateStreak(today);

    if (storedDoneDate) {
      document.getElementById("doneornot").innerText = "Congratulations! You've done today's pushups.";
    } else {
      document.getElementById("doneornot").innerText = "Pending. Press 'Done' to mark this day as completed.";
    }

    document.getElementById("streak").innerText = `Current streak: ${streak} days`;
}

function markAsDone() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB'); // DD/MM/YYYY format

    localStorage.setItem(dateStr, "done");
    updateStatus();
  }

function cancelDone() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-GB'); // DD/MM/YYYY format

    localStorage.removeItem(dateStr);
    updateStatus();
}

function calculateStreak(currentDate) {
    let streak = 0;
    let currentDateCopy = new Date(currentDate);

    while (localStorage.getItem(currentDateCopy.toLocaleDateString('en-GB'))) {
      streak++;
      currentDateCopy.setDate(currentDateCopy.getDate() - 1);
    }

    return streak;
}

getpushups("01/01/2024", new Date());
totalpushups("01/01/2024", new Date());
totalpushupsbydate();
updateStatus()
calculateStreak()