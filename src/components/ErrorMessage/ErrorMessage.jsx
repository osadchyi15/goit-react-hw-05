import s from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={s.errorWrapper}>
      <p className={s.errorMessage}>We are very sorry. An error occurred.</p>
      {/* // TODO Home link for error */}

      <a className={s.errorHomeLink} href="" title="Home">
        Click here to go to the Home page!
      </a>
    </div>
  );
};

export default ErrorMessage;
