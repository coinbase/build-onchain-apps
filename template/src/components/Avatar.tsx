// Type definition for the props expected by the Avatar component.
type AvatarProps = {
  name: string; // The full name of the user.
};

/**
 * Extracts up to two initials from a given name.
 *
 * Example: getInitials("John Doe") returns "JD".
 * If the name has only one word, it takes the first letter of that word.
 *
 * @param name - The full name from which to extract initials.
 * @returns A string containing up to two uppercase initials.
 */
function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((word) => word[0])
    .join('')
    .toUpperCase();
}

// Predefined set of background colors.
const backgroundColors = [
  '#d058c1', // Pink
  '#b388f5', // Purple
  '#e9b300', // Yellow
  '#1354e1', // Blue
  '#0b8552', // Green
];

/**
 * Maps a string to one of the predefined background colors.
 *
 * The function computes a hash from the string and uses it to select
 * a color from the predefined set.
 *
 * @param str - The string used to select the color.
 * @returns A hex color string.
 */
function stringToColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % backgroundColors.length;
  return backgroundColors[index];
}

/**
 * The Avatar component displays a circle with the user's initials and a background color.
 * The background color is consistent for the same name.
 *
 * Usage: <Avatar name="John Doe" />
 * This will display a circle with the initials "JD" and a consistent background color for "John Doe".
 *
 * @param props - Contains the name.
 * @returns A JSX element representing the user's avatar.
 */
function Avatar({ name }: AvatarProps) {
  const initials = getInitials(name); // Getting initials from the name.
  const backgroundColor = stringToColor(name); // Generating a background color based on the name.

  // Rendering the avatar with Tailwind CSS classes for styling.
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{ backgroundColor, width: '50px', height: '50px' }}
    >
      <span className="text-xl text-white">{initials}</span>
    </div>
  );
}

export default Avatar;
