"""
Diagnose the LIVE deployed Vercel app at https://sapa-isyarat.vercel.app/
Captures console errors, network request failures, and page status.
webapp-testing skill: reconnaissance-then-action pattern on deployed URL.
"""
from playwright.sync_api import sync_playwright
import time

console_messages = []
page_errors = []
failed_requests = []
all_requests = []

with sync_playwright() as p:
    browser = p.chromium.launch(
        headless=False,
        args=[
            "--use-fake-ui-for-media-stream",
            "--use-fake-device-for-media-stream",
        ]
    )
    context = browser.new_context(permissions=["camera"])
    page = context.new_page()

    def handle_console(msg):
        console_messages.append(f"[{msg.type.upper()}] {msg.text}")

    def handle_page_error(err):
        page_errors.append(f"[PAGE ERROR] {err}")

    def handle_request_failed(req):
        failed_requests.append(
            f"  FAILED: {req.method} {req.url}\n"
            f"          Reason: {req.failure}"
        )

    def handle_response(resp):
        # Only log non-asset requests (skip JS/CSS/images)
        url = resp.url
        if any(x in url for x in [".js", ".css", ".png", ".svg", ".ico", "/_next"]):
            return
        all_requests.append(f"  {resp.status} {resp.request.method} {url}")

    page.on("console", handle_console)
    page.on("pageerror", handle_page_error)
    page.on("requestfailed", handle_request_failed)
    page.on("response", handle_response)

    print("Navigating to https://sapa-isyarat.vercel.app/ ...")
    page.goto("https://sapa-isyarat.vercel.app/")
    page.wait_for_load_state("networkidle")

    # Wait for MediaPipe to load and camera to initialise
    print("Waiting 12s for MediaPipe and camera to initialise...")
    time.sleep(12)

    page.screenshot(path="deployed_inspect.png", full_page=True)

    print("\n=== Console Messages ===")
    for msg in console_messages:
        print(msg)

    print("\n=== Page Errors ===")
    for err in page_errors:
        print(err)

    print("\n=== Failed Network Requests ===")
    if failed_requests:
        for r in failed_requests:
            print(r)
    else:
        print("  (none)")

    print("\n=== API/Backend Requests ===")
    if all_requests:
        for r in all_requests:
            print(r)
    else:
        print("  (none — no API calls were made)")

    print("\n=== Status text on page ===")
    try:
        paras = page.locator("p").all()
        for p_el in paras:
            print(f"  <p>: {p_el.text_content()}")
    except Exception as e:
        print(f"  Could not read: {e}")

    browser.close()
    print("\nDone.")
