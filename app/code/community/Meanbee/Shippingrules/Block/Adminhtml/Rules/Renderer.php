<?php

class Meanbee_Shippingrules_Block_Adminhtml_Rules_Renderer
    extends Mage_Adminhtml_Block_Widget_Grid_Column_Renderer_Abstract
{
    public function render(Varien_Object $row)
    {
        $conditions = $row->getConditions();
        return $this->asHtmlRecursive($conditions);
    }
    protected function asHtmlRecursive($condition, $level = 0)
    {
        $clipPoint = Mage::helper('meanship/config')->getClipPointOnGrid();
        $colapseLevel = Mage::helper('meanship/config')->getColapseSubconditionOnGrid();
        if ($condition->getConditions()) {
            $html = '<details'.($level < $colapseLevel ? ' open' : '').'><summary>'.$this->renderCondition($condition).'</summary><ul id="'.$condition->getPrefix().'__'.$condition->getId().'__children" class="rule-param-children" style="padding-left: 1em">';
            foreach ($condition->getConditions() as $i => $child) {
                if ($clipPoint > 0 && $i >= $clipPoint) {
                    $html .='<li>⋮</li>';
                    break;
                }
                $html .= '<li>'.$this->asHtmlRecursive($child, $level + 1).'</li>';
            }
            $html .= '</ul></details>';
        } else {
            $html = $this->renderCondition($condition);
        }
        return $html;
    }
    protected function renderCondition($condition)
    {
        switch ($condition->getAttribute()) {
            case 'dest_country_id':
                $countryHelper = Mage::helper('meanship/country');
                $emojiOne = new Emojione_Client();
                $countryCodes = $condition->getValue();
                $countryNames = explode(', ', $condition->getValueName());
                $listlen = count($countryCodes);
                $countries = '';
                for ($i = 0; $i < $listlen; $i++) {
                    switch (Mage::helper('meanship/config')->getCondenseCountriesOnGrid()) {
                        case 'code':
                            $countries .= ", <abbr title='{$countryNames[$i]}'>";
                            $countries .= $countryCodes[$i];
                            $countries .= "</abbr>";
                            break;
                        case 'flag':
                            $countries .= ", <abbr title='{$countryNames[$i]} ({$countryCodes[$i]})'>";
                            $imageCode = $emojiOne->unicodeToImage($countryHelper->toRegionalIndicatorSymbols($countryCodes[$i]));
                            if (preg_match("/<img/", $imageCode)) {
                                $countries .= $imageCode;
                            } else {
                                $countries .= $countryCodes[$i];
                            }
                            $countries .= "</abbr>";
                            break;
                        case 'full':
                        default:
                            $countries .= ', ' . $countryNames[$i];
                            break;
                    }
                }
                return $condition->getAttributeName() . ' ' . $condition->getOperatorName() . ' ' . substr($countries, 1);
                break;
            default:
                return $condition->asString();
        }
    }
}
