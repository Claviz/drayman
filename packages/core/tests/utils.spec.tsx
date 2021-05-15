import { isEvent, render } from '../shared/utils';

test('renders single element', async () => {
    const result = await render(
        <button style={{ color: 'red' }}>Click me!</button>
    );

    expect(result).toMatchSnapshot();
});

test(`renders nested elements`, async () => {
    const result = await render(
        <div>
            <button style={{ color: 'red' }}>Red button</button>
            <button style={{ color: 'blue' }}>Blue button</button>
        </div>
    );

    expect(result).toMatchSnapshot();
});

test(`ignores empty elements`, async () => {
    const result = await render(
        <div>
            {undefined}
            {null}
            <h1>Hello, world!</h1>
            {true}
            {false}
        </div>
    );
    expect(result).toMatchSnapshot();
});

test(`function as children`, async () => {
    function Repeat(props) {
        let items = [];
        for (let i = 0; i < props.numTimes; i++) {
            items.push(props.children(i));
        }
        return <div>{items}</div>;
    }
    const result = await render(
        <Repeat numTimes={3}>
            {(index) => <p>This is item {index} in the list</p>}
        </Repeat>
    );

    expect(result).toMatchSnapshot();
});

it(`expression as children 2`, async () => {
    const items = ['This is item 0 in the list', 'This is item 1 in the list', 'This is item 2 in the list'];
    function SubItem({ message }) {
        return <p>{message}</p>;
    }
    function Item({ message }) {
        return <SubItem message={message} />;
    }
    const result = await render(
        <div>
            {items.map((message) => <Item message={message} />)}
        </div>
    );

    expect(result).toMatchSnapshot();
});

it(`detects events`, async () => {
    expect(isEvent('onClick')).toBeTruthy();
    expect(isEvent('onA')).toBeTruthy();
    expect(isEvent('onclick')).toBeFalsy();
    expect(isEvent('ona')).toBeFalsy();
    expect(isEvent('one')).toBeFalsy();
    expect(isEvent('on')).toBeFalsy();
    expect(isEvent('o')).toBeFalsy();
    expect(isEvent('oNClick')).toBeFalsy();
    expect(isEvent('ONClick')).toBeFalsy();
});

it(`renders components with childRenderer`, async () => {
    const renderedChildKeys = [];

    function Child({ message }) {
        return <child message={message} />;
    }

    const childRenderer = async (type, key, props) => {
        if (type === 'child') {
            renderedChildKeys.push(key);

            return (
                <h3>
                    {props.message}
                </h3>
            );
        } else if (type === 'other-child') {
            renderedChildKeys.push(key);

            return (
                <h6>
                    {props.message}
                </h6>
            );
        }

        return null;
    }

    const result = await render(
        [
            <div>
                <child message="Hello, world!" />
                <not-child message="Hello, world!" />
            </div>,
            <child message="Hello, orphan!" />,
            <Child message="Hello, func orphan!" />,
            <other-child message="Hello, other child!" />,
        ],
        childRenderer
    )

    expect(renderedChildKeys).toEqual([
        '/0/div/0/child',
        '/1/child',
        '/2/child',
        '/3/other-child'
    ]);

    expect(result).toMatchSnapshot();
});

test('stores events correctly', async () => {
    const result = await render(
        <input type="text" onValueChange={async () => { }} onValueChangeStart={async () => { }} />
    );

    expect(result).toMatchSnapshot();
});

test(`renders nested array of elements`, async () => {
    const result = await render(
        [
            <h1>Hello, world!</h1>,
            [
                <h1>Hello, world!</h1>,
            ]
        ]
    );
    expect(result).toMatchSnapshot();
});

test(`renders fragments as nested array of elements`, async () => {
    const result = await render(
        <>
            <h1>Hello, world!</h1>
            <>
                <h1>Hello, world!</h1>
            </>
        </>
    );
    expect(result).toMatchSnapshot();
});

test(`renders deprecated elements correctly`, async () => {
    const result = await render(
        <container>
            <html><h1>Hello, world!</h1></html>
        </container>
    );
    expect(result).toMatchSnapshot();
});

test(`renders styles appending 'px' to number values where possible`, async () => {
    const result = await render(
        <div style={{ width: 100, height: 50, flex: 1 }}>Hello, world!</div>
    );
    expect(result).toMatchSnapshot();
});

test(`converts camel-cased styles to kebab-case`, async () => {
    const result = await render(
        <div style={{ backgroundColor: 'red', paddingTop: '15px' }}>Hello, world!</div>
    );
    expect(result).toMatchSnapshot();
});

test(`custom CSS properties are allowed`, async () => {
    const result = await render(
        <div style={{ ['--theme-color' as any]: 'black' }}>Hello, world!</div>
    );
    expect(result).toMatchSnapshot();
});