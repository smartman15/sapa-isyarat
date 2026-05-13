"""
Enhanced diagnostic: captures verbose console errors including stack traces.
webapp-testing skill pattern: navigate -> wait for networkidle -> collect logs.
"""
from playwright.sync_api import sync_playwright
import time

console_messages = []
page_errors = []

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=False,
        args=[
            "--use-fake-ui-for-media-stream",
            "--use-fake-device-for-media-stream",
            "--enable-logging",
            "--log-level=0",
        ]
    )
    context = browser.new_context(permissions=["camera"])
    page = context.new_page()

    def handle_console(msg):
        # Capture all args for richer output
        text = msg.text
        console_messages.append(f"[{msg.type.upper()}] {text}")

    def handle_page_error(err):
        page_errors.append(f"[PAGE ERROR] {err}")

    page.on("console", handle_console)
    page.on("pageerror", handle_page_error)

    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")

    # Wait for MediaPipe WASM to attempt loading
    time.sleep(10)

    page.screenshot(path="inspect_gesture2.png", full_page=True)

    print("=== Console Messages ===")
    for msg in console_messages:
        print(msg)

    print("\n=== Page Errors (uncaught exceptions) ===")
    for err in page_errors:
        print(err)

    print("\n=== Status text on page ===")
    try:
        # Get all <p> tags to see full status
        paras = page.locator("p").all()
        for p_el in paras:
            print(f"  <p>: {p_el.text_content()}")
    except Exception as e:
        print(f"Could not get text: {e}")

    browser.close()
