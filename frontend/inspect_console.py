"""
Capture browser console errors from the GestureTranslator page.
Uses webapp-testing skill pattern: navigate -> wait for networkidle -> collect logs.
"""
from playwright.sync_api import sync_playwright
import time

console_messages = []

with sync_playwright() as p:
    # Launch with fake camera permission granted
    browser = p.chromium.launch(
        headless=False,
        args=[
            "--use-fake-ui-for-media-stream",  # Auto-grant camera permission
            "--use-fake-device-for-media-stream",  # Provide a fake camera feed
        ]
    )
    context = browser.new_context(
        permissions=["camera"],
    )
    page = context.new_page()

    # Collect all console output
    def handle_console(msg):
        console_messages.append(f"[{msg.type.upper()}] {msg.text}")

    page.on("console", handle_console)

    # Navigate and wait for page to fully load
    page.goto("http://localhost:3000")
    page.wait_for_load_state("networkidle")

    # Wait extra time for MediaPipe WASM to load and camera to init
    time.sleep(8)

    # Take a screenshot to see what the UI is showing
    page.screenshot(path="inspect_gesture.png", full_page=True)

    print("=== Console Messages ===")
    for msg in console_messages:
        print(msg)

    print("\n=== Status text on page ===")
    try:
        status = page.locator("p").first.text_content()
        print(f"First <p> text: {status}")
    except Exception as e:
        print(f"Could not get status text: {e}")

    browser.close()
