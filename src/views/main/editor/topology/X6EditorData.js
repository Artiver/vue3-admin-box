export default {
    drawData: {
        nodes: [
            {
                id: 'node1',
                shape: 'rect',
                x: 140,
                y: 240,
                width: 100,
                height: 40,
                label: 'hello',
                attrs: {
                    // body 是选择器名称，选中的是 rect 元素
                    body: {
                        stroke: '#8f8f8f',
                        strokeWidth: 1,
                        fill: '#fff',
                        rx: 6,
                        ry: 6,
                    },
                },
            },
            {
                id: 'node2',
                shape: 'rect',
                x: 360,
                y: 480,
                width: 100,
                height: 40,
                label: 'world',
                attrs: {
                    body: {
                        stroke: '#8f8f8f',
                        strokeWidth: 1,
                        fill: '#fff',
                        rx: 6,
                        ry: 6,
                    },
                },
            },
        ],
        edges: [
            {
                shape: 'edge',
                source: 'node1',
                target: 'node2',
                label: 'x6',
                attrs: {
                    // line 是选择器名称，选中的边的 path 元素
                    line: {
                        stroke: '#8f8f8f',
                        strokeWidth: 1,
                    },
                },
            },
        ],
    }
}