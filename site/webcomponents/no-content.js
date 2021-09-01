const demoComponentNoContentTemplate = document.createElement('template');
demoComponentNoContentTemplate.innerHTML = `
<div>
  <span>Web component!</span>
</div>
`;

class DemoComponentNoContent extends HTMLElement {

    cartId;

    static get observedAttributes() {
        return ['cartId']
    }

    constructor() {
        super()
            .attachShadow({ mode: "open" })
            .appendChild(demoComponentNoContentTemplate.content.cloneNode(true))
    }

    connectedCallback() {
        console.log('[DemoComponent] connected!');
    }

    attributeChangedCallback(name, oldVal, newVal) {
        this[name] = newVal;
        console.log(`[DemoComponent] New value for attribute '${name}': ${oldVal} => ${newVal}`);
    }
}

window.customElements.define('demo-component-no-content', DemoComponentNoContent);
