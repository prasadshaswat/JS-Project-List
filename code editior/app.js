document.addEventListener('DOMContentLoaded', () => {
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const jsCode = document.getElementById('js-code');
    const preview = document.getElementById('preview');

    function updatePreview() {
        const htmlContent = htmlCode.value;
        const cssContent = `<style>${cssCode.value}</style>`;
        const jsContent = `<script>${jsCode.value}<\/script>`;
        const previewContent = `
            ${htmlContent}
            ${cssContent}
            ${jsContent}
        `;
        preview.srcdoc = previewContent;
    }

    htmlCode.addEventListener('input', updatePreview);
    cssCode.addEventListener('input', updatePreview);
    jsCode.addEventListener('input', updatePreview);

    // Initial preview
    updatePreview();
});
