import s from "./ErrorMessage.module.css";

const ErrorMessage = () => {
  return (
    <div className={s.errorWrapper}>
      <p className={s.errorMessage}>We are very sorry. An error occurred.</p>
      {/* // TODO Home link for error */}
      <p>
        Click&nbsp;
        <a className={s.errorHomeLink} href="" title="Home">
          here
        </a>
        &nbsp;to go Home page!
      </p>
    </div>
  );
};

export default ErrorMessage;
