import './GraphError.scss';

const GraphError = ({ invalidFields }: { invalidFields: string[]; }) => {
    return (
        <div className="graph-error">
            <h4>
                There is an error
            </h4>
            <div>
                The fields:
                <ul>
                    {
                        invalidFields.map(field => <li>{field}</li>)
                    }
                </ul>
                are deleted or changed
            </div>
        </div >
    );
};

export default GraphError;