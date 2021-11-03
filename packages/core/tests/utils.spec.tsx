import { isEvent, render } from '../src/utils';

test('renders single element', async () => {
    const result = await render(
        <button style={{ color: 'red' }}>Click me!</button>
    );

    expect(result).toMatchSnapshot();
});

test('bindings are working', async () => {
    const text = 'world';
    const result = await render(
        <div>
            <div>Hello, {text}!</div>
        </div>
    );

    expect(result).toMatchSnapshot();
});

test('sets SVG attributes', async () => {
    const result = await render(
        <svg width="100" height="100">
            <circle cx="50" cy="50" r="20" stroke="green" stroke-width="4" fill="yellow" />
        </svg>
    );

    expect(result).toMatchSnapshot();
});

test(`renders elements mixed with text`, async () => {
    const result = await render(
        <div>
            Hello,
            <button>world</button>
            !
        </div>
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
            {''}
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

test(`expression as children 2`, async () => {
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

test(`detects events`, async () => {
    expect(isEvent('onClick')).toBeTruthy();
    expect(isEvent('onA')).toBeTruthy();
    expect(isEvent('onclick')).toBeTruthy();
    // expect(isEvent('ona')).toBeFalsy();
    // expect(isEvent('one')).toBeFalsy();
    // expect(isEvent('on')).toBeFalsy();
    expect(isEvent('o')).toBeFalsy();
    expect(isEvent('oNClick')).toBeFalsy();
    expect(isEvent('ONClick')).toBeFalsy();
});

test(`renders components with childRenderer`, async () => {
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

test(`renders components with childRenderer and custom key`, async () => {
    const renderedChildKeys = [];
    const childRenderer = async (type, key, props) => {
        if (type === 'child') {
            renderedChildKeys.push(key);

            return (
                <h3>
                    {props.message}
                </h3>
            );
        }
    }
    const result = await render(
        [
            <child key="custom-1" message="1"></child>,
            <child key="custom-2" message="2"></child>,
            <child key="custom-3" message="3"></child>,
        ],
        childRenderer,
    )
    expect(renderedChildKeys).toEqual([
        '/custom-1/child',
        '/custom-2/child',
        '/custom-3/child'
    ]);
    expect(result).toMatchSnapshot();
});

test('returns options for events', async () => {
    const result = await render(
        <input type="text" onInput={[async () => { }, { debounce: 500 }]} />
    );

    expect(result).toMatchSnapshot();
});

test('stores events correctly', async () => {
    const result = await render(
        <input type="text" onInput={async () => { }} />
    );

    expect(result).toMatchSnapshot();
});

test('stores events for custom elements correctly', async () => {
    const result = await render(
        <custom-element onInput={async () => { }} />
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

test(`renders styles appending 'px' to number values where possible`, async () => {
    const result = await render(
        <div style={{ width: 100, height: 50, flex: 1 }}>Hello, world!</div>
    );
    expect(result).toMatchSnapshot();
});

test(`custom CSS properties are allowed`, async () => {
    const result = await render(
        <div style={{ ['--theme-color' as any]: 'black' }}>Hello, world!</div>
    );
    expect(result).toMatchSnapshot();
});