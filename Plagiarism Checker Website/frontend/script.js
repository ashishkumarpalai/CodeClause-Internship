
document.getElementById('checkButton').addEventListener('click', () => {
    const originalText = document.getElementById('originalText').value;
    const textToCheck = document.getElementById('textToCheck').value;


    fetch('http://localhost:3000/checkPlagiarism', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ originalText, textToCheck }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.plagiarism) {
                if (data.percentage === 100) {
                  // Display an alarm modal
                  Swal.fire({
                    icon: 'warning',
                    title: 'Plagiarism Detected!',
                    text: `Plagiarism Percentage: ${data.percentage}%.`,
                  });
                } else {
                  // Display a regular plagiarism detected modal
                  Swal.fire({
                    icon: 'error',
                    title: 'Plagiarism Detected!',
                    text: `Plagiarism Percentage: ${data.percentage}%`,
                  });
                }
              } else {
                // Display a SweetAlert2 modal for no plagiarism detected
                Swal.fire({
                  icon: 'success',
                  title: 'No Plagiarism Detected',
                });
              }
        });
});

