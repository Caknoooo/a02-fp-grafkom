uniform sampler2D uBakedDayTexture;
uniform sampler2D uBakedNightTexture;
uniform sampler2D uBakedNeutralTexture;
uniform sampler2D uLightMapTexture;

uniform float uNightMix;
uniform float uNeutralMix;

uniform vec3 uLightAreaColor;
uniform float uLightAreaStrength;

uniform vec3 uLightSpotColor;
uniform float uLightSpotStrength;

uniform vec3 uLightPcColor;
uniform float uLightPcStrength;

varying vec2 vUv;

// #pragma glslify: blend = require(glsl-blend/add)
#pragma glslify: blend = require(glsl-blend/lighten)
// #pragma glslify: blend = require(glsl-blend/normal)
// #pragma glslify: blend = require(glsl-blend/screen)

void main()
{
    vec3 bakedDayColor = texture2D(uBakedDayTexture, vUv).rgb;
    vec3 bakedNightColor = texture2D(uBakedNightTexture, vUv).rgb;
    vec3 bakedNeutralColor = texture2D(uBakedNeutralTexture, vUv).rgb;
    vec3 bakedColor = mix(mix(bakedDayColor, bakedNightColor, uNightMix), bakedNeutralColor, uNeutralMix);
    vec3 lightMapColor = texture2D(uLightMapTexture, vUv).rgb;

    float lightAreaStrength = lightMapColor.r * uLightAreaStrength;
    bakedColor = blend(bakedColor, uLightAreaColor, lightAreaStrength);

    float lightPcStrength = lightMapColor.b * uLightPcStrength;
    bakedColor = blend(bakedColor, uLightPcColor, lightPcStrength);

    float lightSpotStrength = lightMapColor.g * uLightSpotStrength;
    bakedColor = blend(bakedColor, uLightSpotColor, lightSpotStrength);

    gl_FragColor = vec4(bakedColor, 1.0);
}