import s from "./SearchForm.module.css";
import { Field, Form, Formik } from "formik";

const SearchForm = ({ handleChangeQuery }) => {
  const onSubmit = (values, actions) => {
    handleChangeQuery(values.query);
    actions.resetForm();
  };

  const initialValues = {
    query: "",
  };

  return (
    <div className={s.formWrapper}>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        <Form className={s.form}>
          <Field className={s.searchInput} name="query" />
          <button className={s.searchBtn} type="submit">
            Search
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default SearchForm;
