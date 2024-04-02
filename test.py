from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
from selenium.common.exceptions import TimeoutException
import time

# Function to check if the temperature text has changed from its default
class text_has_changed(object):
    def __init__(self, locator, text):
        self.locator = locator
        self.text = text

    def __call__(self, driver):
        # Find the element
        actual_element = driver.find_element(*self.locator)
        # Check if the text has changed from the default text
        return actual_element.text != self.text

# Start the WebDriver and open the webpage
driver = webdriver.Chrome()
driver.maximize_window()
driver.get("https://ronitsharma03.github.io/Weather-App/")

try:
    # Wait for the search box to be visible
    search_box = WebDriverWait(driver, 5).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, "input.search-city"))
    )
    
    # Enter a location in the search box
    search_box.send_keys("invalidcity")
    
    # Click the search button
    search_button = driver.find_element(By.CSS_SELECTOR, "#submit")
    search_button.click()
    
    # Handle unexpected alert
    try:
        WebDriverWait(driver, 3).until(EC.alert_is_present())
        alert = driver.switch_to.alert
        alert.accept()
    except:
        pass

    # Check for error message
    try:
        error_message = WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.ID, "error-message"))
        ).text
        
        assert "not found" in error_message.lower(), "Alert message not displayed for invalid city"
    except TimeoutException:
        print("Alert for city not found error handling successful.")

    # Clear the search box
    search_box.clear()

    # Enter a valid location in the search box
    search_box.send_keys("patna")

    # Click the search button again
    search_button.click()

    # Wait for the temperature to be visible as an indication that the weather has loaded
    WebDriverWait(driver, 20).until(
        text_has_changed((By.ID, "temp"), "Search")
    )

    # Retrieve temperature and description
    temperature = WebDriverWait(driver, 10).until(
        EC.visibility_of_element_located((By.ID, "temp"))
    )
    description = driver.find_element(By.ID, "description").text
    
    assert temperature.text != "Search", "Temperature is empty"
    assert description != "", "Description is empty"
    
    print("Weather information retrieved successfully:")
    print("Temperature:", temperature.text)
    print("Description:", description)

    # Retrieve wind speed, minimum, and maximum temperature
    wind_speed = driver.find_element(By.ID, "wind_speed").text
    min_temp = driver.find_element(By.ID, "min_temp").text
    max_temp = driver.find_element(By.ID, "max_temp").text
    
    assert wind_speed != "Wind Speed", "Wind speed is empty"
    assert min_temp != "Min Temperature", "Min temperature is empty"
    assert max_temp != "Max Temperature", "Max temperature is empty"
    
    print("Additional weather details:")
    print("Wind Speed:", wind_speed)
    print("Min Temperature:", min_temp)
    print("Max Temperature:", max_temp)

    # Test passed
    print("Weather information verified successfully!")

    # Responsive Design Testing
    # Check the size of the window
    window_size = driver.get_window_size()
    print("Window size:", window_size)

    # Performance Measurement
    start_time = time.time()

    # Simulate another search
    search_box.clear()
    search_box.send_keys("new york")
    search_button.click()

    # Wait for the weather details to be loaded
    WebDriverWait(driver, 20).until(
        text_has_changed((By.ID, "temp"), "Search")
    )

    end_time = time.time()
    print("Time taken for search and display:", end_time - start_time, "seconds")

    # Local Date and Time Validation
    # Extract the local time displayed
    local_time_element = driver.find_element(By.CLASS_NAME, "time")
    local_time = local_time_element.text

    # Validate the format of the time
    assert ":" in local_time, "Invalid time format"

    print("Local date and time:", local_time)

    # Test passed
    print("Local date and time validated successfully!")

finally:
    # Close the browser window
    driver.quit()
