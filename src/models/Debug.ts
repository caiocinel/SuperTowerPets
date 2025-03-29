class Debug {

    private elements: HTMLElement[] = [];

    constructor() { }

    public Line(options: {
        x: number, 
        y: number, 
        width?: number, 
        height?: number, 
        type?: 'horizontal' | 'vertical' | 'diagonal',
        color?: string,
        thickness?: number
    }) {
        const root = document.getElementById('app');

        if (!root)
            return alert("Failed to find debug div");

        const { x, y, width = 0.1, height, type = 'horizontal', color = 'red', thickness = 1 } = options;
        
        var entityElement = document.createElement('div');
        entityElement.className = `debug-line ${type}`;
        entityElement.style.position = 'absolute';
        entityElement.style.zIndex = '9999999';
        entityElement.style.backgroundColor = color;
        
        if (type === 'horizontal') {
            entityElement.style.left = `${x * 100}%`;
            entityElement.style.top = `${y * 100}%`;
            entityElement.style.width = `${width * 100}%`;
            entityElement.style.height = `${thickness}px`;
        } else if (type === 'vertical') {
            entityElement.style.left = `${x * 100}%`;
            entityElement.style.top = `${y * 100}%`;
            entityElement.style.width = `${thickness}px`;
            entityElement.style.height = height ? `${height * 100}%` : '10%';
        } else if (type === 'diagonal') {            
            entityElement.style.left = `${x * 100}%`;
            entityElement.style.top = `${y * 100}%`;
            entityElement.style.width = `${width * 100}%`;
            entityElement.style.height = `${thickness}px`;
            entityElement.style.transformOrigin = 'left center';
            
            const angle = height ? Math.atan2(height, width) * (180 / Math.PI) : 45;
            entityElement.style.transform = `rotate(${angle}deg)`;
        }

        root.appendChild(entityElement);
        this.elements.push(entityElement);
        
        return entityElement;
    }
    
    public Text(options: {
        x: number, 
        y: number, 
        text: string,
        color?: string,
        size?: number,
        background?: string
    }) {
        const root = document.getElementById('app');

        if (!root)
            return alert("Failed to find debug div");
            
        const { x, y, text, color = 'white', size = 14, background = 'rgba(0,0,0,0.7)' } = options;
        
        var textElement = document.createElement('div');
        textElement.className = 'debug-text';
        textElement.style.position = 'absolute';
        textElement.style.left = `${x * 100}%`;
        textElement.style.top = `${y * 100}%`;
        textElement.style.padding = '2px 5px';
        textElement.style.color = color;
        textElement.style.backgroundColor = background;
        textElement.style.fontSize = `${size}px`;
        textElement.style.fontFamily = 'monospace';
        textElement.style.zIndex = '9999999';
        textElement.style.pointerEvents = 'none';
        textElement.innerText = text;
        
        root.appendChild(textElement);
        this.elements.push(textElement);
        
        return textElement;
    }
    
    public Circle(options: {
        x: number, 
        y: number, 
        radius: number,
        color?: string,
        fill?: boolean,
        opacity?: number,
        thickness?: number
    }) {
        const root = document.getElementById('app');

        if (!root)
            return alert("Failed to find debug div");
            
        const { x, y, radius, color = 'red', fill = false, opacity = 0.5, thickness = 2 } = options;
        
        var circleElement = document.createElement('div');
        circleElement.className = 'debug-circle';
        circleElement.style.position = 'absolute';
        circleElement.style.borderRadius = '50%';
        
        const radiusInVw = radius * 100;
        
        circleElement.style.left = `${x * 100}%`;
        circleElement.style.top = `${y * 100}%`;
        circleElement.style.width = `${radiusInVw * 2}vw`;
        circleElement.style.height = `${radiusInVw * 2}vw`; 
        circleElement.style.transform = `translate(-50%, -50%)`; 
        
        if (fill) {
            circleElement.style.backgroundColor = color;
            circleElement.style.opacity = opacity.toString();
        } else {
            circleElement.style.border = `${thickness}px solid ${color}`;
        }
        
        circleElement.style.zIndex = '9999999';
        circleElement.style.pointerEvents = 'none';
        
        root.appendChild(circleElement);
        this.elements.push(circleElement);
        
        return circleElement;
    }
    
    public Box(options: {
        x: number, 
        y: number, 
        width: number, 
        height: number,
        color?: string,
        fill?: boolean,
        opacity?: number
    }) {
        const root = document.getElementById('app');

        if (!root)
            return alert("Failed to find debug div");
            
        const { x, y, width, height, color = 'red', fill = false, opacity = 0.5 } = options;
        
        var boxElement = document.createElement('div');
        boxElement.className = 'debug-box';
        boxElement.style.position = 'absolute';
        boxElement.style.left = `${x * 100}%`;
        boxElement.style.top = `${y * 100}%`;
        boxElement.style.width = `${width * 100}%`;
        boxElement.style.height = `${height * 100}%`;
        
        if (fill) {
            boxElement.style.backgroundColor = color;
            boxElement.style.opacity = opacity.toString();
        } else {
            boxElement.style.border = `2px solid ${color}`;
        }
        
        boxElement.style.zIndex = '9999999';
        boxElement.style.pointerEvents = 'none';
        
        root.appendChild(boxElement);
        this.elements.push(boxElement);
        
        return boxElement;
    }
    
    public RenderTest(options: {
        x: number,
        y: number,
        name: string,
        passed: boolean,
        details?: string
    }) {
        const { x, y, name, passed, details } = options;
        
        
        const box = this.Box({
            x,
            y,
            width: 0.2,
            height: 0.05,
            color: passed ? 'green' : 'red',
            fill: true,
            opacity: 0.3
        });
        
        
        this.Text({
            x,
            y,
            text: `${name}: ${passed ? 'PASS' : 'FAIL'}`,
            color: passed ? 'lightgreen' : 'pink',
            size: 12
        });
        
        
        if (details) {
            this.Text({
                x: x + 0.01,
                y: y + 0.03,
                text: details,
                size: 10,
                color: 'white'
            });
        }
        
        return box;
    }

    public clear() {
        this.elements.forEach(x => x.remove());
        this.elements = [];
    }
}

export default new Debug();