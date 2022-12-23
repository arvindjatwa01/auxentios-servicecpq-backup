export const ReadOnlyField = (props) => {
  return (
    <div className={props.className}>
      <div className="form-group">
        <p className="font-size-12 font-weight-500 mb-2">{props.label}</p>
        <h6 className="font-weight-500 text-uppercase text-primary font-size-17">
          {props.value? props.value : "NA"}
        </h6>
      </div>
    </div>
  );
};
