// dateFormatter.tsx

/**
 * Formats a given date string to "Member Since DD, MMM YYYY" format.
 * @param dateString The date string to format.
 * @returns A string representing the formatted date.
 */
export function formatDate(dateString: string): string {
    // Parse the date string into a Date object
    const date = new Date(dateString);

    // Options for formatting the date
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "short", // "short" for abbreviated month name
        day: "numeric",
    };

    // Format the date according to the options
    const formattedDate = date.toLocaleDateString("en-US", options);

    // Extract the day, month, and year components
    const [month, day, year] = formattedDate.split(" ");

    // Construct the final string
    const memberSince = `Member Since ${day} ${month} ${year}`;

    return memberSince;
}
