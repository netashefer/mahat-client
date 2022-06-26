
import './Catalog.scss';

interface CatalogProps { }

const mock = [{ id: "2", name: "גרף2" }, { id: "1", name: "גרף1" }]

const Catalog = ({ }: CatalogProps) => {
    const sections = [
        {
            name: "כללי",
            widgets: [{ id: "title", name: "כותרת" }]
        },
        {
            name: "גרפים",
            widgets: mock
        }
    ]

    return (
        <div className='catalog'>
            <h1>קטלוג</h1>
            {sections.map(section => {
                return (
                    <>
                        <h4>{section.name}</h4>
                        {
                            section.widgets.map(m => <button className='widget-option'>{m.name}</button>)
                        }
                    </>
                )
            })}
        </div>
    );
}

export default Catalog;
