$(document).ready(() => {
    
    const form = $("form"),
    fileInput = $(".file-input"),
    progressArea = $(".progress"),
    uploadedArea = $();

    form.bind("click", () => {
        fileInput.click();
    });
});