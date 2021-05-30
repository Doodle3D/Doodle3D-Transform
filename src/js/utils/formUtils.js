import { SubmissionError } from 'redux-form';
// import createDebug from 'debug';
// const debug = createDebug('d3d:utils:form');

// redux form submit promise wrapper
// - turns all errors into SubmissionError
// - fills _error field, enables showing main error message in form
// - includes superlogin's validationErrors
export function formPromiseWrapper(promise) {
  return new Promise((resolve, reject) => {
    promise
      .then(resolve)
      .catch(err => {
        // axius (used by superlogin http utils) puts response data in response.data
        if (err.response && err.response.data) {
          err = err.response.data;
        }

        // promise middleware puts actual error in reason
        if (err.action && err.reason) {
          err = err.reason;
        }
        const submissionErrors = {
          _error: err.message || err.error
        };
        // add superlogin validation errors
        // joined because superlogin creates arrays per field
        for (const prop in err.validationErrors) {
          submissionErrors[prop] = err.validationErrors[prop].join(', ');
        }
        const submissionError = new SubmissionError(submissionErrors);

        reject(submissionError);
      });
  });
}
