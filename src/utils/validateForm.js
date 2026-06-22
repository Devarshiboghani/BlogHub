const validateForm = (data) => {
  let errors = {};

  if (!data.title || data.title.trim() === "") {
    errors.title = "Title is required!";
  }

  if (!data.content || data.content.trim() === "") {
    errors.content = "Content is required !";
  }

  if (!data.category || data.category.trim() === "") {
    errors.category = "Category is required !";
  }

  if (!data.date || data.date.trim() === "") {
    errors.date = "Date is required !";
  }

  return errors;
};

export default validateForm;
